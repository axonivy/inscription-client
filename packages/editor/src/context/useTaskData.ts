import { TaskDataAccess } from '@axonivy/inscription-protocol';
import { createContext, useContext } from 'react';
import { useData } from './useData';

export const TaskDataContextInstance = createContext<string>('config/task');

export function useTaskData<K extends keyof TaskDataAccess>(
  path: K
): [TaskDataAccess[K], TaskDataAccess[K], (newData: TaskDataAccess[K]) => void];
export function useTaskData<T>(path: string): [T, T, (newData: T) => void] {
  const taskIndex = useContext(TaskDataContextInstance);
  return useData(`${taskIndex}/${path}`);
}
