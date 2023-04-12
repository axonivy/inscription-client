import { render, screen, TableUtil, renderHook, waitFor } from 'test-utils';
import { ElementScript } from '@axonivy/inscription-protocol';
import { useOutputTab } from './OutputTab';
import { TabState } from '../../../components/props';

const Tab = (props: { hideCode?: boolean }) => {
  const tab = useOutputTab({ hideCode: props.hideCode });
  return <>{tab.content}</>;
};

describe('OutputTab', () => {
  function renderTab(data?: Partial<ElementScript>, hideCode?: boolean) {
    render(<Tab hideCode={hideCode} />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(map: RegExp[], code: string) {
    TableUtil.assertRows(map);
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderTab();
    await assertMainPart([], '');
  });

  test('full data', async () => {
    const data: Partial<ElementScript> = { output: { map: { key: 'value' }, code: 'code' } };
    renderTab(data);
    await assertMainPart([/key value/], 'code');
  });

  test('hide code', async () => {
    renderTab({}, true);
    await waitFor(() => expect(screen.queryByTestId('code-editor')).not.toBeInTheDocument());
  });

  function assertState(expectedState: TabState, data?: Partial<ElementScript>, hideCode?: boolean) {
    const { result } = renderHook(() => useOutputTab({ hideCode }), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('empty', { sudo: true });
    assertState('empty', { output: { code: 'code', map: {} } }, true);
    assertState('configured', { output: { code: 'code', map: {} } });
    assertState('configured', { output: { code: '', map: { key: 'value' } } });
  });
});
