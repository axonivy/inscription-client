import { DeepPartial, renderHook } from 'test-utils';
import { ElementData, ErrorCatchData } from '@axonivy/inscription-protocol';
import { useErrorCatchData } from './useErrorCatchData';

describe('useErrorCatchData', () => {
  function renderDataHook(errorData: ErrorCatchData) {
    let data: DeepPartial<ElementData> = { name: 'test', config: errorData };
    const view = renderHook(() => useErrorCatchData(), { wrapperProps: { data, setData: newData => (data = newData) } });
    return { view, data: () => data };
  }

  test('in synch', () => {
    const { view, data } = renderDataHook({ errorCode: 'test' });

    view.result.current.updateError('myCoolName');
    expect(data().name).toEqual('myCoolName');
  });

  test('not in synch', () => {
    const { view, data } = renderDataHook({ errorCode: 'error' });

    view.result.current.updateError('myCoolName');
    expect(data().name).toEqual('test');
  });
});
