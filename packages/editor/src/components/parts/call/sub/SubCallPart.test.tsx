import { useSubCallPart } from './SubCallPart';
import { render, screen, TableUtil, renderHook } from 'test-utils';
import { CallData, ProcessCallData } from '@axonivy/inscription-protocol';
import { PartState } from '../../../props';

const Part = () => {
  const part = useSubCallPart();
  return <>{part.content}</>;
};

describe('SubCallPart', () => {
  function renderPart(data?: CallData & ProcessCallData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(dialog: string, map: RegExp[], code: string) {
    expect(await screen.findByRole('combobox', { name: 'Process start' })).toHaveValue(dialog);
    TableUtil.assertRows(map);
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart('', [], '');
  });

  test('full data', async () => {
    renderPart({ processCall: 'process', call: { code: 'code', map: { key: 'value' } } });
    await assertMainPart('process', [/key value/], 'code');
  });

  function assertState(expectedState: PartState, data?: Partial<CallData & ProcessCallData>) {
    const { result } = renderHook(() => useSubCallPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { processCall: 'dialog' });
    assertState('configured', { call: { code: 'code', map: {} } });
    assertState('configured', { call: { code: '', map: { key: 'value' } } });
  });
});
