import { ScriptMappings } from '@axonivy/inscription-protocol';
import { cloneObject } from 'test-utils';
import { WsProperty } from './properties';

describe('Properties', () => {
  const props: ScriptMappings = {
    cache: '123',
    ssl: 'true'
  };

  const properties: WsProperty[] = [
    { name: 'cache', expression: '123' },
    { name: 'ssl', expression: 'true' }
  ];

  test('of', () => {
    expect(WsProperty.of(props)).toEqual(properties);
  });

  test('update', () => {
    const expected = cloneObject(properties);
    expected[1].expression = 'test';
    expect(WsProperty.update(cloneObject(properties), 1, 'expression', 'test')).toEqual(expected);
  });

  test('to', () => {
    expect(WsProperty.to(properties)).toEqual(props);
  });
});
