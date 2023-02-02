import { removeDefaults } from './remove-defaults';

describe('remove defaults', () => {
  test('remove', () => {
    expect(removeDefaults({}, {})).toEqual({});

    expect(removeDefaults({ a: '' }, {})).toEqual({ a: '' });
    expect(removeDefaults({ a: '' }, { a: '' })).toEqual({});
    expect(removeDefaults({ a: '' }, { b: '' })).toEqual({ a: '' });

    expect(removeDefaults({ a: { c: 'hi' }, b: true }, { a: { c: 'hello' }, b: false })).toEqual({ a: { c: 'hi' }, b: true });
    expect(removeDefaults({ a: { c: 'hi' }, b: true }, { a: { c: 'hello' }, b: true })).toEqual({ a: { c: 'hi' } });
    expect(removeDefaults({ a: { c: 'hi' }, b: true }, { a: { c: 'hi' }, b: true })).toEqual({});

    expect(removeDefaults({ a: [] }, { a: [] })).toEqual({});
    expect(removeDefaults({ a: ['hi'] }, { a: [] })).toEqual({ a: ['hi'] });
  });
});
