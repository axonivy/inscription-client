import { renderHook } from 'test-utils';
import { Message } from './message';
import { TabState, useTabState } from './tab';

describe('TabState', () => {
  function assertState(expectedState: TabState, data?: any, message?: Message[]) {
    const { result } = renderHook(() => useTabState({}, data ?? {}, message ?? []));
    expect(result.current).toEqual(expectedState);
  }

  test('states', async () => {
    assertState('empty');
    assertState('configured', { something: 'else' });
    assertState('configured', { something: 'else' }, [{ severity: 'info', message: '' }]);
    assertState('warning', { something: 'else' }, [
      { severity: 'info', message: '' },
      { severity: 'warning', message: '' }
    ]);
    assertState('error', { something: 'else' }, [
      { severity: 'info', message: '' },
      { severity: 'warning', message: '' },
      { severity: 'error', message: '' }
    ]);
  });
});
