import { AlternativeConditions, ConnectorRef, InscriptionType } from '@axonivy/inscription-protocol';
import { Condition } from './condition';
import { cloneObject } from 'test-utils';

describe('Condition', () => {
  const altConditions: AlternativeConditions = {
    f1: 'false',
    f6: 'in.accept == true',
    f8: ''
  };

  const conditions: Condition[] = [
    { fid: 'f1', expression: 'false' },
    { fid: 'f6', expression: 'in.accept == true' },
    { fid: 'f8', expression: '' }
  ];

  const altType: InscriptionType = {
    description: '',
    iconId: '',
    id: 'Alternative',
    impl: '',
    label: '',
    shortLabel: ''
  };

  test('of', () => {
    expect(Condition.of(altConditions)).toEqual(conditions);
  });

  test('replace', () => {
    const ref: ConnectorRef = {
      name: 'flow',
      pid: 'f6',
      source: { name: 'alternative', pid: 'f5', type: altType },
      target: { name: 'end', pid: 'f7', type: altType }
    };
    const expected = cloneObject(conditions);
    expected[1].target = ref.target;
    expect(Condition.replace(cloneObject(conditions), 'f6', ref)).toEqual(expected);
  });

  test('replace - undefined', () => {
    //@ts-ignore
    const ref: ConnectorRef = {};
    expect(Condition.replace(cloneObject(conditions), 'f6', ref)).toEqual(conditions);
  });

  test('move', () => {
    const expected = [];
    expected.push(conditions[1], conditions[0], conditions[2]);
    expect(Condition.move(cloneObject(conditions), 'f6', 'f1')).toEqual(expected);
  });

  test('update', () => {
    const expected = cloneObject(conditions);
    expected[1].expression = 'test';
    expect(Condition.update(cloneObject(conditions), 1, 'expression', 'test')).toEqual(expected);
  });

  test('to', () => {
    expect(Condition.to(conditions)).toEqual(altConditions);
  });
});
