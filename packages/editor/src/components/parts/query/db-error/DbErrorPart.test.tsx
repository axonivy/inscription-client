import type { DeepPartial } from 'test-utils';
import { CollapsableUtil, render, renderHook } from 'test-utils';
import type { DbErrorData, InscriptionValidation } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../../editors';
import { describe, test, expect } from 'vitest';
import { useDbErrorPart } from './DbErrorPart';

const Part = () => {
  const part = useDbErrorPart();
  return <>{part.content}</>;
};

describe('DbErrorPart', () => {
  function renderPart(data?: DeepPartial<DbErrorData>) {
    render(<Part />, {
      wrapperProps: { data: data && { config: data } }
    });
  }

  test('empty data', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Error');
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<DbErrorData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useDbErrorPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState(undefined);
    assertState('configured', { exceptionHandler: 'bla' });

    assertState('error', undefined, { path: 'exceptionHandler', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'exceptionHandler', message: '', severity: 'WARNING' });
  });

  test('reset', () => {
    let data = { config: { exceptionHandler: 'bla' } };
    const view = renderHook(() => useDbErrorPart(), {
      wrapperProps: {
        data,
        setData: newData => (data = newData),
        initData: { config: { exceptionHandler: 'err' } }
      }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config.exceptionHandler).toEqual('err');
  });
});
