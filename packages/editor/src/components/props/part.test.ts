import { renderHook } from 'test-utils';
import { Message } from './message';
import { PartState, usePartState } from './part';

describe('PartState', () => {
  function assertState(expectedState: PartState, data?: any, message?: Message[]) {
    const { result } = renderHook(() => usePartState({}, data ?? {}, message ?? []));
    expect(result.current).toEqual(expectedState);
  }

  test('states', async () => {
    assertState('empty');
    assertState('configured', { something: 'else' });
    assertState('configured', { something: 'else' }, [{ severity: 'INFO', message: '' }]);
    assertState('warning', { something: 'else' }, [
      { severity: 'INFO', message: '' },
      { severity: 'WARNING', message: '' }
    ]);
    assertState('error', { something: 'else' }, [
      { severity: 'INFO', message: '' },
      { severity: 'WARNING', message: '' },
      { severity: 'ERROR', message: '' }
    ]);
  });
});
