import type { DeepPartial } from 'test-utils';
import { render, renderHook, screen, TableUtil, CollapsableUtil, SelectUtil } from 'test-utils';
import type { ElementData, InscriptionValidation, WsResponseData } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../editors';
import { useWsResponsePart } from './WsResponsePart';
import { describe, test, expect } from 'vitest';

const Part = () => {
  const part = useWsResponsePart();
  return <>{part.content}</>;
};

describe('WsResponsePart', () => {
  function renderPart(data?: DeepPartial<WsResponseData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Error');
  });

  test('data', async () => {
    renderPart({ output: { map: { bla: '123' }, code: 'code' }, exceptionHandler: 'ex' });
    TableUtil.assertRows(['⛔ bla 123']);
    expect(screen.getByLabelText('Code')).toHaveValue('code');
    await CollapsableUtil.assertOpen('Error');
    await SelectUtil.assertValue('ex');
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<WsResponseData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useWsResponsePart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState(undefined);
    assertState('configured', { output: { code: 'asdf' } });
    assertState('configured', { output: { map: { name: 'a' } } });
    assertState('configured', { exceptionHandler: 'ex' });

    assertState('error', undefined, { path: 'output.code', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'exceptionHandler', message: '', severity: 'WARNING' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = { config: { output: { map: { bla: '123' }, code: 'code' }, exceptionHandler: 'ex' } };
    const view = renderHook(() => useWsResponsePart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { exceptionHandler: 'init' } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.exceptionHandler).toEqual('init');
    expect(data.config?.output?.code).toEqual('');
    expect(data.config?.output?.map).toEqual({});
  });
});
