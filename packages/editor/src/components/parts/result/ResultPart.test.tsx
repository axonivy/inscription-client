import { CollapsableUtil, DeepPartial, render, renderHook, screen, TableUtil } from 'test-utils';
import { ResultData } from '@axonivy/inscription-protocol';
import { useResultPart } from './ResultPart';
import { PartState } from '../../props';

const Part = () => {
  const part = useResultPart();
  return <>{part.content}</>;
};

describe('ResultPart', () => {
  function renderPart(data?: DeepPartial<ResultData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(params: RegExp[], map: RegExp[], code: string) {
    await CollapsableUtil.assertClosed('Result parameters');
    if (params.length === 0) {
      TableUtil.assertRows(map);
    } else {
      await CollapsableUtil.toggle('Result parameters');
      TableUtil.assertRows(params, 1);
      TableUtil.assertRows(map, 4);
    }
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart([], [], '');
  });

  test('full data', async () => {
    renderPart({
      result: { code: 'code', map: { key: 'value' }, params: [{ name: 'param', type: 'String', desc: 'desc' }] }
    });
    await assertMainPart([/param String desc/], [/result <>/, /desc String/, /key value/], 'code');
  });

  function assertState(expectedState: PartState, data?: DeepPartial<ResultData>) {
    const { result } = renderHook(() => useResultPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { result: { code: 'code' } });
    assertState('configured', { result: { map: { key: 'value' } } });
    assertState('configured', { result: { params: [{ name: 'param', type: 'String', desc: 'desc' }] } });
  });

  test('reset', () => {
    let data: any = {
      config: {
        result: { code: 'code', map: { key: 'value' }, params: [{ name: 'param', type: 'String', desc: 'desc' }] }
      }
    };
    const view = renderHook(() => useResultPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { result: { code: 'initcode' } } } }
    });
    expect(view.result.current.reset?.dirty).toEqual(true);

    view.result.current.reset?.action();
    expect(data.config.result.code).toEqual('initcode');
    expect(data.config.result.map).toEqual({});
    expect(data.config.result.params).toEqual([]);
  });
});
