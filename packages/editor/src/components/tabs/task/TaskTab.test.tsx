import { renderHook } from 'test-utils';
import { Data, Task, TaskData } from '@axonivy/inscription-protocol';
import { useTaskTab } from './TaskTab';
import { TabState } from '../../props';

describe('TaskTab', () => {
  function assertState(expectedState: TabState, task?: Partial<Task>, taskData?: Partial<TaskData>, showPersist?: boolean) {
    //@ts-ignore
    let data: Data = task ? { config: { task } } : undefined;
    if (taskData) {
      //@ts-ignore
      data = { data: { task: taskData } };
    }
    const { result } = renderHook(() => useTaskTab({ showPersist }), { wrapperProps: { data } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { name: 'name' });
    assertState('configured', { description: 'desc' });
    assertState('configured', { category: 'cat' });
    assertState('configured', { responsible: { type: 'ROLE_FROM_ATTRIBUTE', activator: '' } });
    assertState('configured', { priority: { level: 'LOW', script: '' } });

    assertState('configured', { skipTasklist: true });
    assertState('configured', { delay: 'delay' });
    assertState('empty', undefined, { persist: true }, true);

    //@ts-ignore
    assertState('configured', { expiry: { timeout: 'asf' } });

    assertState('configured', { customFields: [{ name: 'cf', type: 'NUMBER', value: '123' }] });
    assertState('configured', { code: 'code' });
  });
});
