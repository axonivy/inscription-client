import { CollapsableUtil, render, renderHook, screen, TableUtil } from 'test-utils';
import { NameData } from '@axonivy/inscription-protocol';
import { useNameTab } from './NameTab';
import { TabState } from '../../../components/props';

const Tab = (props: { hideTags?: boolean }) => {
  const tab = useNameTab({ hideTags: props.hideTags });
  return <>{tab.content}</>;
};

describe('NameTab', () => {
  function renderTab(data?: NameData, hideTags?: boolean) {
    render(<Tab hideTags={hideTags} />, { wrapperProps: { data } });
  }

  async function assertMainPart(name: string, description: string, docs: string[]) {
    expect(await screen.findByLabelText('Display name')).toHaveValue(name);
    expect(await screen.findByLabelText('Description')).toHaveValue(description);
    TableUtil.assertRows(docs);
  }

  test('empty data', async () => {
    renderTab();
    await assertMainPart('', '', []);
    await CollapsableUtil.assertClosed('Tags');
  });

  test('hide tags', async () => {
    renderTab(undefined, true);
    await assertMainPart('', '', []);
    expect(screen.queryByText('Tags')).not.toBeInTheDocument();
  });

  test('full data', async () => {
    renderTab({ name: 'name', description: 'description', docs: [{ name: 'doc', url: 'url' }], tags: ['tag1'] });
    await assertMainPart('name', 'description', ['doc url']);
    await CollapsableUtil.assertOpen('Tags');
  });

  function assertState(expectedState: TabState, data?: Partial<NameData>) {
    const { result } = renderHook(() => useNameTab(), { wrapperProps: { data } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { name: 'name' });
    assertState('configured', { description: 'des' });
    assertState('configured', { docs: [{ name: 'a', url: 'u' }] });
    assertState('configured', { tags: ['demo'] });
  });
});
