import { render, screen, renderHook } from 'test-utils';
import { useOutputCodePart } from './OutputCodePart';
import { PartStateFlag } from '../../editors';
import { OutputData } from '@axonivy/inscription-protocol';

const Part = () => {
  const part = useOutputCodePart();
  return <>{part.content}</>;
};

describe('OutputCodePart', () => {
  function renderPart(data?: OutputData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(code: string, sudo: boolean) {
    expect(await screen.findByLabelText('Code')).toHaveValue(code);
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

  function assertState(expectedState: PartStateFlag, data?: Partial<OutputData>) {
    const { result } = renderHook(() => useOutputCodePart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { sudo: true });
    assertState('configured', { output: { code: 'code', map: {} } });
    assertState('empty', { output: { code: '', map: { key: 'value' } } });
  });

  test('reset', () => {
    let data: any = {
      config: { output: { code: 'code', map: {} }, sudo: true }
    };
    const view = renderHook(() => useOutputCodePart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { output: { code: 'init' } } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config.output.code).toEqual('init');
    expect(data.config.output.map).toEqual({});
    expect(data.config.sudo).toEqual(false);
  });
});
