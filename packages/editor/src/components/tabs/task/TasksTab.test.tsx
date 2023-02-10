import { render, screen, renderHook, userEvent } from 'test-utils';
import { TaskData } from '@axonivy/inscription-protocol';
import { TabState } from '../../props';
import { useTasksTab } from './TasksTab';

const Tab = () => {
  const tab = useTasksTab();
  return <>{tab.content}</>;
};

describe('TaskTab', () => {
  function renderTab(data?: Partial<TaskData>) {
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
        //@ts-ignore
        { id: 'TaskA', name: 'task 1' },
        //@ts-ignore
        { id: 'TaskB', name: 'task 2' }
      ]
    });
    expect(screen.getAllByRole('tab')).toHaveLength(2);
    expect(screen.getByLabelText('Name')).toHaveValue('task 1');

    await userEvent.click(screen.getByRole('tab', { name: 'TaskB' }));
    expect(screen.getByLabelText('Name')).toHaveValue('task 2');
  });

  function assertState(expectedState: TabState, data?: Partial<TaskData>) {
    //@ts-ignore
    const { result } = renderHook(() => useTasksTab(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('empty', { tasks: [] });
    //@ts-ignore
    assertState('empty', { tasks: [{ id: 'TaskA' }] });
    //@ts-ignore
    assertState('configured', { tasks: [{ id: 'TaskA', name: 'task1' }] });
  });
});
