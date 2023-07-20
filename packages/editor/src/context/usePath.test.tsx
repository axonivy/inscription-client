import { mergePaths } from './usePath';

describe('usePath', () => {
  test('mergePath', async () => {
    expect(mergePaths('test')).toEqual('test');
    expect(mergePaths('test', undefined)).toEqual('test');
    expect(mergePaths('test', '')).toEqual('test');

    expect(mergePaths('test', 'bla')).toEqual('test.bla');
    expect(mergePaths('test', 'bla.hi')).toEqual('test.bla.hi');
    expect(mergePaths('test.1', 'bla.hi')).toEqual('test.1.bla.hi');

    expect(mergePaths('test', 1)).toEqual('test.[1]');
    expect(mergePaths('test.bla', 15)).toEqual('test.bla.[15]');
  });
});
