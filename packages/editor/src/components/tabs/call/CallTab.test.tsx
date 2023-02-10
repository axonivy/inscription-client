import { useCallTab } from './CallTab';
import { render, screen, TableUtil, renderHook } from 'test-utils';
import { CallData } from '@axonivy/inscription-protocol';
import { TabState } from '../../../components/props';

const Tab = () => {
  const tab = useCallTab();
  return <>{tab.content}</>;
};

describe('CallTab', () => {
  function renderTab(data?: CallData) {
    //@ts-ignore
    render(<Tab />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(dialog: string, map: RegExp[], code: string) {
    expect(await screen.findByRole('combobox', { name: 'Dialog' })).toHaveValue(dialog);
    TableUtil.assertRows(map);
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderTab();
    await assertMainPart('', [], '');
  });

  test('full data', async () => {
    const callData: CallData = { dialog: 'dialog', call: { code: 'code', map: [{ key: 'key', value: 'value' }] } };
    renderTab(callData);
    await assertMainPart('dialog', [/key value/], 'code');
  });

  function assertState(expectedState: TabState, data?: Partial<CallData>) {
    //@ts-ignore
    const { result } = renderHook(() => useCallTab(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { dialog: 'dialog' });
    assertState('configured', { call: { code: 'code', map: [] } });
    assertState('configured', { call: { code: '', map: [{ key: 'key', value: 'value' }] } });
  });
});
