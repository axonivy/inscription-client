import { render, screen, renderHook, userEvent } from 'test-utils';
import { TaskData, DEFAULT_TASK } from '@axonivy/inscription-protocol';
import { TabState } from '../../props';
import { useTasksTab } from './TasksTab';
import { deepmerge } from 'deepmerge-ts';
import { DeepPartial } from '../../../types/types';

const Tab = () => {
  const tab = useTasksTab();
  return <>{tab.content}</>;
};

describe('TasksTab', () => {
  function renderTab(data?: DeepPartial<TaskData>) {
    data = addDefaultTaskData(data);
    //@ts-ignore
    render(<Tab />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty data', async () => {
    renderTab();
    expect(screen.getByText('There is no (Task) output flow connected.')).toBeInTheDocument();
  });

  test('full data', async () => {
    renderTab({
      tasks: [
        { id: 'TaskA', name: 'task 1' },
        { id: 'TaskB', name: 'task 2' }
      ]
    });
    expect(screen.getAllByRole('tab')).toHaveLength(2);
    expect(screen.getByLabelText('Name')).toHaveValue('task 1');

    await userEvent.click(screen.getByRole('tab', { name: 'TaskB' }));
    expect(screen.getByLabelText('Name')).toHaveValue('task 2');
  });

  function assertState(expectedState: TabState, data?: DeepPartial<TaskData>) {
    data = addDefaultTaskData(data);
    //@ts-ignore
    const { result } = renderHook(() => useTasksTab(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('empty', { tasks: [] });
    assertState('empty', { tasks: [{ id: 'TaskA' }] });
    assertState('configured', { tasks: [{ id: 'TaskA', name: 'task1' }] });
  });

  function addDefaultTaskData(data?: DeepPartial<TaskData>): DeepPartial<TaskData> | undefined {
    if (data) {
      data.tasks = data.tasks?.map(task => deepmerge(DEFAULT_TASK, task));
    }
    return data;
  }
});
