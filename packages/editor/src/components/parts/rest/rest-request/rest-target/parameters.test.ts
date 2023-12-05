import { cloneObject } from 'test-utils';
import { Parameter } from './parameters';
import { describe, test, expect } from 'vitest';

describe('Parameters', () => {
  const params: Parameter[] = [
    { name: 'petId', expression: '4', known: true, kind: 'Path', type: 'Number', doc: '* required\ndescription' },
    { name: 'test', expression: '123', known: false, kind: 'Path' }
  ];

  test('of - empty', () => {
    expect(Parameter.of([], [], {}, 'Path')).toEqual([]);
  });

  test('of - unknown prop', () => {
    const result: Parameter = { name: 'test', expression: '123', known: false, kind: 'Path' };
    expect(Parameter.of([], [], { test: '123' }, 'Path')).toEqual([result]);
  });

  test('of - unknown prop query', () => {
    const result: Parameter = { name: 'test', expression: '123', known: false, kind: 'Query' };
    expect(Parameter.of([], [], { test: '123' }, 'Query')).toEqual([result]);
  });

  test('of - known prop', () => {
    const result: Parameter = { name: 'petId', expression: '', known: true, kind: 'Path', type: 'Number', doc: 'description' };
    expect(
      Parameter.of(
        [{ name: 'petId', type: { fullQualifiedName: 'Number' }, required: false, properties: [], doc: 'description' }],
        [],
        {},
        'Path'
      )
    ).toEqual([result]);
  });

  test('of - known requried prop', () => {
    const result: Parameter = { name: 'petId', expression: '', known: true, kind: 'Path', type: 'Number', doc: '* required\ndescription' };
    expect(
      Parameter.of(
        [{ name: 'petId', type: { fullQualifiedName: 'Number' }, required: true, properties: [], doc: 'description' }],
        [],
        {},
        'Path'
      )
    ).toEqual([result]);
  });

  test('of - mixed', () => {
    expect(
      Parameter.of(
        [{ name: 'petId', type: { fullQualifiedName: 'Number' }, required: true, properties: [], doc: 'description' }],
        ['petId', 'api'],
        { test: '123', petId: '4' },
        'Path'
      )
    ).toEqual([params[0], { name: 'api', kind: 'Path', known: true, expression: '' }, params[1]]);
  });

  test('update', () => {
    const expected = cloneObject(params);
    expected[1].expression = 'test';
    expect(Parameter.update(cloneObject(params), 1, 'expression', 'test')).toEqual(expected);
  });

  test('to', () => {
    expect(Parameter.to(params, 'Path')).toEqual({ test: '123', petId: '4' });
  });

  test('to - query', () => {
    expect(Parameter.to(params, 'Query')).toEqual({});
  });
});
