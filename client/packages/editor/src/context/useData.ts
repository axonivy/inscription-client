import { CallDataAccess, NameDataAccess, OutputDataAccess, TaskDataAccess } from '@axonivy/inscription-core';
import get from 'lodash/get';
import { useDataContext } from './useDataContext';

export interface DataAccess extends NameDataAccess, CallDataAccess, OutputDataAccess, TaskDataAccess {}

export function useData<K extends keyof DataAccess>(path: K): [DataAccess[K], DataAccess[K], (newData: DataAccess[K]) => void];
export function useData<T>(path: string): [T, T, (newData: T) => void];
export function useData<T>(path: string): [T, T, (newData: T) => void] {
  const fullPath = path.split('/');
  const { initialData, data, updateData } = useDataContext();
  return [get(initialData, fullPath), get(data, fullPath), (newData: T) => updateData<T>(fullPath, newData)];
}
