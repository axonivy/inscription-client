import type { DeepPartial} from 'test-utils';
import { renderHook, waitFor } from 'test-utils';
import { useFindPathParams, useTargetPathSplit } from './usePathParams.js';
import type { RestRequestData } from '@axonivy/inscription-protocol';

describe('useTargetPathSplit', () => {
  test('empty', () => {
    expect(useTargetPathSplit('')).toEqual(['']);
  });

  test('no findings', () => {
    expect(useTargetPathSplit('/bla/hi/test')).toEqual(['/bla/hi/test']);
  });

  test('params', () => {
    expect(useTargetPathSplit('/{bla}/hi/{test}')).toEqual(['/', '{bla}', '/hi/', '{test}', '']);
  });
});

describe('useFindPathParams', () => {
  function findParts(data?: DeepPartial<RestRequestData>, restClientUri?: string) {
    const { result } = renderHook(() => useFindPathParams(), {
      wrapperProps: { data: data && { config: data }, meta: { restClientUri } }
    });
    return result;
  }

  test('empty', () => {
    expect(findParts().current).toEqual([]);
  });

  test('no findings', () => {
    expect(findParts({ target: { path: '/nothing/special' } }, 'localhost/api/v1').current).toEqual([]);
  });

  test('params', async () => {
    const result = findParts({ target: { path: '/{something}/special' } }, 'localhost/{api}/v1');
    await waitFor(() => expect(result.current).toEqual(['api', 'something']));
  });
});
