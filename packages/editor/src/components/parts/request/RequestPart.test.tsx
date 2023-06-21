import { ComboboxUtil, render, renderHook, screen } from 'test-utils';
import { StartRequest } from '@axonivy/inscription-protocol';
import { useRequestPart } from './RequestPart';
import { PartState } from '../../props';

const Part = () => {
  const part = useRequestPart();
  return <>{part.content}</>;
};

describe('StartRequestPart', () => {
  function renderPart(data?: StartRequest) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty data', async () => {
    renderPart();
    // await ComboboxUtil.assertEmpty({ label: 'Signal Code' });
    // await ComboboxUtil.assertOptionsCount(1);
    // expect(await screen.findByLabelText(/Attach to Business Case/)).toBeChecked();
  });

  test('boundary', async () => {
    renderPart(undefined);
    // await ComboboxUtil.assertEmpty({ label: 'Signal Code' });
    // expect(screen.queryByText(/Attach to Business Case/)).not.toBeInTheDocument();
  });

  // test('full data', async () => {
  //   renderPart({ signalCode: 'test:code', attachToBusinessCase: false });
  //   await ComboboxUtil.assertValue('test:code', { label: 'Signal Code' });
  //   expect(await screen.findByLabelText(/Attach to Business Case/)).not.toBeChecked();
  // });

  function assertState(expectedState: PartState, data?: Partial<StartRequest>) {
    const { result } = renderHook(() => useRequestPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  // test('configured', async () => {
  //   assertState('empty');
  //   assertState('configured', { signalCode: 'error' });
  //   assertState('configured', { attachToBusinessCase: false });
  // });

  // test('reset', () => {
  //   let data: any = {
  //     config: { signalCode: 'error', attachToBusinessCase: false }
  //   };
  //   const view = renderHook(() => useRequestPart(), {
  //     wrapperProps: { data, setData: newData => (data = newData), initData: { config: { signalCode: 'init' } } }
  //   });
  //   expect(view.result.current.reset?.dirty).toEqual(true);

  //   view.result.current.reset?.action();
  //   expect(data.config.attachToBusinessCase).toEqual(true);
  // });
});
