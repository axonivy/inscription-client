import type { DeepPartial } from 'test-utils';
import { render, screen, renderHook, userEvent } from 'test-utils';
import type { TaskData, ElementData } from '@axonivy/inscription-protocol';
import { DEFAULT_TASK, DEFAULT_TASK_DATA } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../editors/index.js';
import { useMultiTasksPart } from './MultiTasksPart.js';
import { deepmerge } from 'deepmerge-ts';

const Part = () => {
  const part = useMultiTasksPart();
  return <>{part.content}</>;
};

describe('MultiTasksPart', () => {
  function renderPart(data?: DeepPartial<TaskData>) {
    data = addDefaultTaskData(data);
    const defaultData = createDefaultTaskData(data);
    render(<Part />, {
      wrapperProps: {
        data: data && { config: data },
        defaultData,
        validations: [{ path: 'tasks.[1].name', message: 'this is an error', severity: 'ERROR' }]
      }
    });
  }

  test('empty data', async () => {
    renderPart();
    expect(screen.getByText('There is no (Task) output flow connected.')).toBeInTheDocument();
  });

  test('full data', async () => {
    renderPart({
      tasks: [
        { id: 'TaskA', name: 'task 1' },
        { id: 'TaskB', name: 'task 2' }
      ]
    });
    expect(screen.getAllByRole('tab')).toHaveLength(2);
    expect(screen.getByRole('tab', { name: 'TaskA' })).not.toHaveAttribute('data-message');
    expect(screen.getByRole('tab', { name: 'TaskB' })).toHaveAttribute('data-message', 'error');

    expect(screen.getByLabelText('Name')).toHaveValue('task 1');
    await userEvent.default.click(screen.getByRole('tab', { name: 'TaskB' }));
    expect(screen.getByLabelText('Name')).toHaveValue('task 2');
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<TaskData>) {
    data = addDefaultTaskData(data);
    const defaultData = createDefaultTaskData(data);
    const { result } = renderHook(() => useMultiTasksPart(), { wrapperProps: { data: data && { config: data }, defaultData } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('empty', { tasks: [] });
    assertState('empty', { tasks: [{ id: 'TaskA' }] });
    assertState('configured', { tasks: [{ id: 'TaskA', name: 'task1' }] });
  });

  test('reset', () => {
    const taskData = addDefaultTaskData({
      tasks: [
        { id: 'TaskA', name: 'task1' },
        { id: 'TaskB', name: 'task2' }
      ]
    });
    let data: DeepPartial<ElementData> = { config: taskData };
    const initTaskData = {
      tasks: [DEFAULT_TASK, DEFAULT_TASK]
    };
    const view = renderHook(() => useMultiTasksPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: initTaskData } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.tasks?.at(0)?.name).toEqual('');
    expect(data.config?.tasks?.at(1)?.name).toEqual('');
  });

  function addDefaultTaskData(data?: DeepPartial<TaskData>): DeepPartial<TaskData> | undefined {
    if (data) {
      data.tasks = data.tasks?.map(task => deepmerge(DEFAULT_TASK, task));
    }
    return data;
  }

  function createDefaultTaskData(data?: DeepPartial<TaskData>): DeepPartial<TaskData> {
    if (data && data.tasks) {
      return {
        tasks: data.tasks.map(task => {
          const dTask = DEFAULT_TASK;
          dTask.id = task.id ?? '';
          return dTask;
        })
      };
    }
    return DEFAULT_TASK_DATA;
  }
});
