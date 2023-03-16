import { renderHook, screen, render } from 'test-utils';
import { Task, TaskData } from '@axonivy/inscription-protocol';
import { useTaskTab } from './TaskTab';
import { TabState } from '../../props';
import { DeepPartial } from '../../../types/types';

const Tab = () => {
  const tab = useTaskTab();
  return <>{tab.content}</>;
};

describe('TaskTab', () => {
  function renderEmptyTab() {
    //@ts-ignore
    render(<Tab />, { wrapperProps: { defaultData: { task: undefined } } });
  }

  function assertState(expectedState: TabState, task?: DeepPartial<Task>, taskData?: Partial<TaskData>, showPersist?: boolean) {
    let data = taskData ? { config: taskData } : task ? { config: { task } } : undefined;
    const { result } = renderHook(() => useTaskTab({ showPersist }), { wrapperProps: { data } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('empty data', async () => {
    renderEmptyTab();
    expect(screen.getByText('There is no (Task) output flow connected.')).toBeInTheDocument();
  });

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { name: 'name' });
    assertState('configured', { description: 'desc' });
    assertState('configured', { category: 'cat' });
    assertState('configured', { responsible: { type: 'ROLE_FROM_ATTRIBUTE', activator: '' } });
    assertState('configured', { priority: { level: 'LOW', script: '' } });

    assertState('configured', { skipTasklist: true });
    assertState('configured', { delay: 'delay' });
    assertState('configured', undefined, { persist: true }, true);

    assertState('configured', { expiry: { timeout: 'asf' } });

    assertState('configured', { customFields: [{ name: 'cf', type: 'NUMBER', value: '123' }] });
    assertState('configured', { code: 'code' });
  });
});
