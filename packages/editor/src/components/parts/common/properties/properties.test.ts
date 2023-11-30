import type { ScriptMappings } from '@axonivy/inscription-protocol';
import { cloneObject } from 'test-utils';
import { Property } from './properties';
import { describe, test, expect } from 'vitest';

describe('Properties', () => {
  const props: ScriptMappings = {
    cache: '123',
    ssl: 'true'
  };

  const properties: Property[] = [
    { name: 'cache', expression: '123' },
    { name: 'ssl', expression: 'true' }
  ];

  test('of', () => {
    expect(Property.of(props)).toEqual(properties);
  });

  test('update', () => {
    const expected = cloneObject(properties);
    expected[1].expression = 'test';
    expect(Property.update(cloneObject(properties), 1, 'expression', 'test')).toEqual(expected);
  });

  test('to', () => {
    expect(Property.to(properties)).toEqual(props);
  });
});
