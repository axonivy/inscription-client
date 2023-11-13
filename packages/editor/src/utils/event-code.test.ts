import { eventCodeInfo } from './event-code';
import { describe, test, expect } from 'vitest';

describe('event code info', () => {
  test('info', () => {
    expect(eventCodeInfo({ eventCode: 'ivy:code', process: 'process', project: 'project', usage: 0 })).toBeUndefined();
    expect(eventCodeInfo({ eventCode: 'ivy:code', process: '', project: 'project', usage: 1 })).toEqual('project (1)');
    expect(eventCodeInfo({ eventCode: 'ivy:code', process: '<INVALID>', project: 'project', usage: 1 })).toEqual('project (1)');
    expect(eventCodeInfo({ eventCode: 'ivy:code', process: 'process', project: 'project', usage: 1 })).toEqual('project > process (1)');
  });
});
