import { renderHook } from 'test-utils';
import type { PartStateFlag} from './usePart.js';
import { usePartState } from './usePart.js';
import type { InscriptionValidation } from '@axonivy/inscription-protocol';

describe('PartState', () => {
  function assertState(expectedState: PartStateFlag, data?: unknown, message?: InscriptionValidation[]) {
    const { result } = renderHook(() => usePartState({}, data ?? {}, message ?? []));
    expect(result.current.state).toEqual(expectedState);
  }

  test('states', async () => {
    assertState('empty');
    assertState('configured', { something: 'else' });
    assertState('configured', { something: 'else' }, [{ path: '', severity: 'INFO', message: '' }]);
    assertState('warning', { something: 'else' }, [
      { path: '', severity: 'INFO', message: '' },
      { path: '', severity: 'WARNING', message: '' }
    ]);
    assertState('error', { something: 'else' }, [
      { path: '', severity: 'INFO', message: '' },
      { path: '', severity: 'WARNING', message: '' },
      { path: '', severity: 'ERROR', message: '' }
    ]);
  });
});
