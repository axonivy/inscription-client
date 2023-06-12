import { DeepPartial, renderHook } from 'test-utils';
import { useStartNameSyncher } from './useStartNameSyncher';
import { ElementData, StartData } from '@axonivy/inscription-protocol';

describe('useStartNameSyncher', () => {
  function renderNameSynchHook(startData: StartData, name?: string, signaturePostfix?: string) {
    let data: DeepPartial<ElementData> = { name: name ?? 'test()' };
    const view = renderHook(() => useStartNameSyncher(startData, signaturePostfix), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    return { view, data: () => data };
  }

  test('in synch', () => {
    let startData: StartData = { signature: 'test', input: { params: [], map: {}, code: '' } };
    const { view, data } = renderNameSynchHook(startData);

    startData.signature = 'myCoolSignature';
    view.rerender();
    expect(data().name).toEqual('myCoolSignature()');
  });

  test('in synch with params', () => {
    let startData: StartData = { signature: 'test', input: { params: [], map: {}, code: '' } };
    const { view, data } = renderNameSynchHook(startData);

    startData.input.params = [
      { name: 'test', type: 'String', desc: '' },
      { name: 'list', type: 'java.util.List<Number>', desc: '' }
    ];
    view.rerender();
    expect(data().name).toEqual('test(String,List<Number>)');
  });

  test('in synch with postfix', () => {
    let startData: StartData = { signature: 'test', input: { params: [], map: {}, code: '' } };
    const { view, data } = renderNameSynchHook(startData, 'test.ivp', '.ivp');

    startData.signature = 'myCoolSignature';
    startData.input.params = [
      { name: 'test', type: 'String', desc: '' },
      { name: 'list', type: 'List<Number>', desc: '' }
    ];
    view.rerender();
    expect(data().name).toEqual('myCoolSignature.ivp');
  });
});
