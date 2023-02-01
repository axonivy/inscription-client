import { render, renderHook, screen, TableUtil } from 'test-utils';
import { Data, NameData } from '@axonivy/inscription-protocol';
import { useNameTab } from './NameTab';
import { TabState } from '../../../components/props';

const Tab = () => {
  const tab = useNameTab();
  return <>{tab.content}</>;
};

describe('NameTab', () => {
  function renderTab(data?: Data) {
    render(<Tab />, { wrapperProps: { data } });
  }

  async function assertMainPart(name: string, description: string, docs: string[]) {
    expect(await screen.findByLabelText('Display name')).toHaveValue(name);
    expect(await screen.findByLabelText('Description')).toHaveValue(description);
    TableUtil.assertRows(docs);
  }

  test('empty data', async () => {
    renderTab();
    await assertMainPart('', '', []);
    expect(await screen.findByText('► Tags')).toBeInTheDocument();
  });

  test('full data', async () => {
    //@ts-ignore
    const data: Data = { name: 'name', description: 'description', docs: [{ name: 'doc', url: 'url' }], tags: ['tag1'] };
    renderTab(data);
    await assertMainPart('name', 'description', ['doc url']);
    expect(await screen.findByText('▼ Tags')).toBeInTheDocument();
  });

  function assertState(expectedState: TabState, data?: Partial<NameData>) {
    //@ts-ignore
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
