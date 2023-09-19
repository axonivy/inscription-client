import { CollapsableUtil, render, renderHook, screen, TableUtil } from 'test-utils';
import { NameData } from '@axonivy/inscription-protocol';
import { useNamePart } from './NamePart';
import { PartStateFlag } from '../../editors';

const Part = (props: { hideTags?: boolean; disableName?: boolean }) => {
  const part = useNamePart({ hideTags: props.hideTags, disableName: props.disableName });
  return <>{part.content}</>;
};

describe('NamePart', () => {
  function renderPart(data?: NameData, hideTags?: boolean, disableName?: boolean) {
    render(<Part hideTags={hideTags} disableName={disableName} />, { wrapperProps: { data } });
  }

  async function assertMainPart(name: string, description: string) {
    expect(await screen.findByLabelText('Display name')).toHaveValue(name);
    expect(await screen.findByLabelText('Description')).toHaveValue(description);
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart('', '');
    await CollapsableUtil.assertClosed('Means / Documents');
    await CollapsableUtil.assertClosed('Tags');
  });

  test('hide tags', async () => {
    renderPart(undefined, true);
    await assertMainPart('', '');
    expect(screen.queryByText('Tags')).not.toBeInTheDocument();
  });

  test('disable name', async () => {
    renderPart(undefined, undefined, true);
    await assertMainPart('', '');
    expect(await screen.findByLabelText('Display name')).toBeDisabled();
  });

  test('full data', async () => {
    renderPart({ name: 'name', description: 'description', docs: [{ name: 'doc', url: 'url' }], tags: ['tag1'] });
    await assertMainPart('name', 'description');
    TableUtil.assertRows(['doc url']);
    await CollapsableUtil.assertOpen('Tags');
  });

  function assertState(expectedState: PartStateFlag, data?: Partial<NameData>) {
    const { result } = renderHook(() => useNamePart(), { wrapperProps: { data } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { name: 'name' });
    assertState('configured', { description: 'des' });
    assertState('configured', { docs: [{ name: 'a', url: 'u' }] });
    assertState('configured', { tags: ['demo'] });
  });

  test('reset', () => {
    let data = { name: 'name', description: 'description', docs: [{ name: 'doc', url: 'url' }], tags: ['tag1'] };
    const view = renderHook(() => useNamePart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { name: 'initName' } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.name).toEqual('initName');
    expect(data.description).toEqual('');
    expect(data.docs).toEqual([]);
    expect(data.tags).toEqual([]);
  });
});
