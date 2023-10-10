import { cloneObject } from 'test-utils';
import { RestParam, restParamBuilder, toMappings, updateRestParams } from './rest-parameter';

describe('RestParam', () => {
  const params: RestParam[] = [
    { name: 'petId', expression: '4', known: true, type: 'Number', doc: '* required\ndescription' },
    { name: 'test', expression: '123', known: false }
  ];

  test('of - empty', () => {
    expect(restParamBuilder().build()).toEqual([]);
  });

  test('of - unknown prop', () => {
    const result: RestParam = { name: 'test', expression: '123', known: false };
    expect(restParamBuilder().mappings({ test: '123' }).build()).toEqual([result]);
  });

  test('of - known prop', () => {
    const result: RestParam = { name: 'petId', expression: '', known: true, type: 'Number', doc: 'description' };
    expect(
      restParamBuilder()
        .openApiParams([{ name: 'petId', type: { fullQualifiedName: 'Number' }, required: false, properties: [], doc: 'description' }])
        .build()
    ).toEqual([result]);
  });

  test('of - known requried prop', () => {
    const result: RestParam = { name: 'petId', expression: '', known: true, type: 'Number', doc: '* required\ndescription' };
    expect(
      restParamBuilder()
        .openApiParams([{ name: 'petId', type: { fullQualifiedName: 'Number' }, required: true, properties: [], doc: 'description' }])
        .build()
    ).toEqual([result]);
  });

  test('of - mixed', () => {
    expect(
      restParamBuilder()
        .openApiParams([{ name: 'petId', type: { fullQualifiedName: 'Number' }, required: true, properties: [], doc: 'description' }])
        .foundParams(['petId', 'api'])
        .mappings({ test: '123', petId: '4' })
        .build()
    ).toEqual([params[0], { name: 'api', known: true, expression: '' }, params[1]]);
  });

  test('update', () => {
    const expected = cloneObject(params);
    expected[1].expression = 'test';
    expect(updateRestParams(cloneObject(params), 1, 'expression', 'test')).toEqual(expected);
  });

  test('to', () => {
    expect(toMappings(params)).toEqual({ test: '123', petId: '4' });
  });
});
