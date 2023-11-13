import type { DeepPartial} from 'test-utils';
import { ComboboxUtil, render, renderHook, screen } from 'test-utils';
import type { ElementData, SignalCatchData } from '@axonivy/inscription-protocol';
import { useSignalCatchPart } from './SignalCatchPart';
import type { PartStateFlag } from '../../editors';

const Part = (props: { makroSupport?: boolean }) => {
  const part = useSignalCatchPart({ makroSupport: props.makroSupport });
  return <>{part.content}</>;
};

describe('SignalCatchPart', () => {
  function renderPart(data?: SignalCatchData, makroSupport?: boolean) {
    render(<Part makroSupport={makroSupport} />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty data', async () => {
    renderPart();
    await ComboboxUtil.assertEmpty({ label: 'Signal Code' });
    await ComboboxUtil.assertOptionsCount(1);
    expect(await screen.findByLabelText(/Attach to Business Case/)).toBeChecked();
  });

  test('boundary', async () => {
    renderPart(undefined, true);
    await ComboboxUtil.assertEmpty({ label: 'Signal Code' });
    expect(screen.queryByText(/Attach to Business Case/)).not.toBeInTheDocument();
  });

  test('full data', async () => {
    renderPart({ signalCode: 'test:code', attachToBusinessCase: false });
    await ComboboxUtil.assertValue('test:code', { label: 'Signal Code' });
    expect(await screen.findByLabelText(/Attach to Business Case/)).not.toBeChecked();
  });

  function assertState(expectedState: PartStateFlag, data?: Partial<SignalCatchData>) {
    const { result } = renderHook(() => useSignalCatchPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { signalCode: 'error' });
    assertState('configured', { attachToBusinessCase: false });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: { signalCode: 'error', attachToBusinessCase: false }
    };
    const view = renderHook(() => useSignalCatchPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { signalCode: 'init' } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.signalCode).toEqual('init');
    expect(data.config?.attachToBusinessCase).toEqual(true);
  });
});
