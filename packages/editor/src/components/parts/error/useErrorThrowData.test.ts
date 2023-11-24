import type { DeepPartial} from 'test-utils';
import { renderHook } from 'test-utils';
import type { ElementData, ErrorThrowData } from '@axonivy/inscription-protocol';
import { useErrorThrowData } from './useErrorThrowData.js';

describe('useErrorThrowData', () => {
  function renderDataHook(errorData: DeepPartial<ErrorThrowData>) {
    let data: DeepPartial<ElementData> = { name: 'test', config: errorData };
    const view = renderHook(() => useErrorThrowData(), { wrapperProps: { data, setData: newData => (data = newData) } });
    return { view, data: () => data };
  }

  test('in synch', () => {
    const { view, data } = renderDataHook({ throws: { error: 'test' } });

    view.result.current.update('error', 'myCoolName');
    expect(data().name).toEqual('myCoolName');
  });

  test('not in synch', () => {
    const { view, data } = renderDataHook({ throws: { error: 'error' } });

    view.result.current.update('error', 'myCoolName');
    expect(data().name).toEqual('test');
  });
});
