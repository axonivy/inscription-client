import { useDialogCallPart } from './DialogCallPart';
import { render, screen, TableUtil, renderHook } from 'test-utils';
import { CallData, DialogCallData } from '@axonivy/inscription-protocol';
import { PartState } from '../../../props';

const Part = () => {
  const part = useDialogCallPart();
  return <>{part.content}</>;
};

describe('DialogCallPart', () => {
  function renderPart(data?: CallData & DialogCallData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(dialog: string, map: RegExp[], code: string) {
    expect(await screen.findByRole('combobox', { name: 'Dialog' })).toHaveValue(dialog);
    TableUtil.assertRows(map);
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart('', [], '');
  });

  test('full data', async () => {
    renderPart({ dialog: 'dialog', call: { code: 'code', map: { key: 'value' } } });
    await assertMainPart('dialog', [/key value/], 'code');
  });

  function assertState(expectedState: PartState, data?: Partial<CallData & DialogCallData>) {
    const { result } = renderHook(() => useDialogCallPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { dialog: 'dialog' });
    assertState('configured', { call: { code: 'code', map: {} } });
    assertState('configured', { call: { code: '', map: { key: 'value' } } });
  });
});
