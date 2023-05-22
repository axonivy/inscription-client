import { AlternativeConditions, InscriptionType } from '@axonivy/inscription-protocol';
import { Condition, FlowData } from './condition';
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
    const flow: FlowData = {
      name: 'flow',
      pid: 'f6',
      source: { name: 'alternative', pid: 'f5', type: altType },
      target: { name: 'end', pid: 'f7', type: altType }
    };
    const expected = cloneObject(conditions);
    expected[1].target = flow.target;
    expect(Condition.replace(cloneObject(conditions), 'f6', flow)).toEqual(expected);
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
