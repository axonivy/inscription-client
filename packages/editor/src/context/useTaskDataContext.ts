import { createContext, useCallback, useContext } from 'react';
import { Task, TaskData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useDataContext } from './useDataContext';

export const TaskDataContextInstance = createContext<number | undefined>(undefined);

export function useTaskDataContext(): {
  task: Task;
  setTask: (updateTask: (task: Task) => Task) => void;
} {
  const taskNumber = useContext(TaskDataContextInstance);
  const { data, setData } = useDataContext();

  const getTask = useCallback(() => {
    if (taskNumber !== undefined) {
      return data.config.tasks?.at(taskNumber) as Task;
    } else {
      return data.config.task as Task;
    }
  }, [data.config, taskNumber]);

  const task = getTask();

  const setTask = useCallback(
    (updateTask: (task: Task) => Task) => {
      setData(
        produce((draft: TaskData) => {
          if (taskNumber !== undefined) {
            if (!draft.config.tasks) {
              draft.config.tasks = [];
            }
            draft.config.tasks[taskNumber] = updateTask(getTask());
          } else {
            draft.config.task = updateTask(getTask());
          }
        })
      );
    },
    [getTask, setData, taskNumber]
  );

  return { task, setTask };
}
