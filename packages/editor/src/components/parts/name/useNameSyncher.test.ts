import { DeepPartial, renderHook } from 'test-utils';
import { ElementData } from '@axonivy/inscription-protocol';
import { useDefaultNameSyncher } from './useNameSyncher';

describe.only('useDefaultNameSyncher', () => {
  function renderNameSynchHook(name: string, syncher: { synchName: string }) {
    let data: DeepPartial<ElementData> = { name };
    const view = renderHook(() => useDefaultNameSyncher(syncher), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    return { view, data: () => data };
  }

  test('in synch', () => {
    let syncher = { synchName: 'test' };
    const { view, data } = renderNameSynchHook('test', syncher);

    syncher.synchName = 'myCoolName';
    view.rerender();
    expect(data().name).toEqual('myCoolName');
  });

  test('not in synch', () => {
    let syncher = { synchName: 'test' };
    const { view, data } = renderNameSynchHook('abcd', syncher);

    syncher.synchName = 'myCoolName';
    view.rerender();
    expect(data().name).toEqual('abcd');
  });
});
