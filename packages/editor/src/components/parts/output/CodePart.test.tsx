import { render, screen, renderHook } from 'test-utils';
import { useCodePart } from './CodePart';
import { PartState } from '../../props';
import { OutputData } from '@axonivy/inscription-protocol';

const Part = () => {
  const part = useCodePart();
  return <>{part.content}</>;
};

describe('CodePart', () => {
  function renderPart(data?: OutputData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(code: string, sudo: boolean) {
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
    const sudoCheckbox = await screen.findByLabelText(/Disable Permission/);
    if (sudo) {
      expect(sudoCheckbox).toBeChecked();
    } else {
      expect(sudoCheckbox).not.toBeChecked();
    }
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart('', false);
  });

  test('full data', async () => {
    const data: OutputData = { output: { code: 'code', map: {} }, sudo: true };
    renderPart(data);
    await assertMainPart('code', true);
  });

  function assertState(expectedState: PartState, data?: Partial<OutputData>) {
    const { result } = renderHook(() => useCodePart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { sudo: true });
    assertState('configured', { output: { code: 'code', map: {} } });
    assertState('empty', { output: { code: '', map: { key: 'value' } } });
  });
});
