import { useSubCallTab } from './SubCallTab';
import { render, screen, TableUtil, renderHook } from 'test-utils';
import { CallData, ProcessCallData } from '@axonivy/inscription-protocol';
import { TabState } from '../../../../components/props';

const Tab = () => {
  const tab = useSubCallTab();
  return <>{tab.content}</>;
};

describe('SubCallTab', () => {
  function renderTab(data?: CallData & ProcessCallData) {
    //@ts-ignore
    render(<Tab />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(dialog: string, map: RegExp[], code: string) {
    expect(await screen.findByRole('combobox', { name: 'Process start' })).toHaveValue(dialog);
    TableUtil.assertRows(map);
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderTab();
    await assertMainPart('', [], '');
  });

  test('full data', async () => {
    renderTab({ processCall: 'process', call: { code: 'code', map: [{ key: 'key', value: 'value' }] } });
    await assertMainPart('process', [/key value/], 'code');
  });

  function assertState(expectedState: TabState, data?: Partial<CallData & ProcessCallData>) {
    //@ts-ignore
    const { result } = renderHook(() => useSubCallTab(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { processCall: 'dialog' });
    assertState('configured', { call: { code: 'code', map: [] } });
    assertState('configured', { call: { code: '', map: [{ key: 'key', value: 'value' }] } });
  });
});
