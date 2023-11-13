import { renderHook } from 'test-utils';
import { useFieldset } from './useFieldset';
import { describe, test, expect } from 'vitest';

describe('useFieldset', () => {
  test('unique ids', () => {
    const { result: fieldset1 } = renderHook(() => useFieldset());
    const { result: fieldset2 } = renderHook(() => useFieldset());
    expect(fieldset1).not.toEqual(fieldset2);
    expect(fieldset1.current).toEqual(fieldsetHookReturnValue(0));
    expect(fieldset2.current).toEqual(fieldsetHookReturnValue(1));
  });

  function fieldsetHookReturnValue(index: number) {
    return {
      inputProps: {
        'aria-labelledby': `fieldset-${index}-label`,
        id: `fieldset-${index}-input`
      },
      labelProps: {
        htmlFor: `fieldset-${index}-input`,
        id: `fieldset-${index}-label`
      }
    };
  }
});
