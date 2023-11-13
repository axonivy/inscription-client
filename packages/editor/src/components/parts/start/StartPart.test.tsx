import type { DeepPartial } from 'test-utils';
import { CollapsableUtil, render, renderHook, screen, TableUtil } from 'test-utils';
import type { ElementData, StartData } from '@axonivy/inscription-protocol';
import { useStartPart } from './StartPart';
import type { PartStateFlag } from '../../editors';
import { describe, test, expect } from 'vitest';

const Part = () => {
  const part = useStartPart();
  return <>{part.content}</>;
};

describe('StartPart', () => {
  function renderPart(data?: DeepPartial<StartData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(signature: string, params: RegExp[], map: RegExp[], code: string) {
    expect(await screen.findByLabelText('Signature')).toHaveValue(signature);
    await CollapsableUtil.assertClosed('Input parameters');
    if (params.length === 0) {
      TableUtil.assertRows(map);
    } else {
      await CollapsableUtil.toggle('Input parameters');
      TableUtil.assertRows(params, 1);
      TableUtil.assertRows(map, 4);
    }
    expect(await screen.findByLabelText('Code')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart('', [], [], '');
  });

  test('full data', async () => {
    renderPart({
      signature: 'sig',
      input: { code: 'code', map: { key: 'value' }, params: [{ name: 'param', type: 'String', desc: 'desc' }] }
    });
    await assertMainPart('sig', [/param String desc/], [/key value/], 'code');
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<StartData>) {
    const { result } = renderHook(() => useStartPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { signature: 'sig' });
    assertState('configured', { input: { code: 'code' } });
    assertState('configured', { input: { map: { key: 'value' } } });
    assertState('configured', { input: { params: [{ name: 'param', type: 'String', desc: 'desc' }] } });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: {
        signature: 'sig',
        input: { code: 'code', map: { key: 'value' }, params: [{ name: 'param', type: 'String', desc: 'desc' }] }
      }
    };
    const view = renderHook(() => useStartPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { signature: 'initSig' } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.signature).toEqual('initSig');
    expect(data.config?.input?.code).toEqual('');
    expect(data.config?.input?.map).toEqual({});
    expect(data.config?.input?.params).toEqual([]);
  });
});
