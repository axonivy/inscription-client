import type { DeepPartial} from 'test-utils';
import { renderHook } from 'test-utils';
import type { ElementData, SignalCatchData } from '@axonivy/inscription-protocol';
import { useSignalCatchData } from './useSignalCatchData';

describe('useSignalCatchData', () => {
  function renderDataHook(signalData: Partial<SignalCatchData>) {
    let data: DeepPartial<ElementData> = { name: 'test', config: signalData };
    const view = renderHook(() => useSignalCatchData(), { wrapperProps: { data, setData: newData => (data = newData) } });
    return { view, data: () => data };
  }

  test('in synch', () => {
    const { view, data } = renderDataHook({ signalCode: 'test' });

    view.result.current.updateSignal('myCoolName');
    expect(data().name).toEqual('myCoolName');
  });

  test('not in synch', () => {
    const { view, data } = renderDataHook({ signalCode: 'code' });

    view.result.current.updateSignal('myCoolName');
    expect(data().name).toEqual('test');
  });
});
