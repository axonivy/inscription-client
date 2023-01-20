import { PersistTaskData, Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { useDataContext, useTaskDataContext } from '../../../../context';

export function useTaskOptionsData(): {
  task: Task;
  updateSkipTasklist: (skip: boolean) => void;
  updateDelay: (delay: string) => void;
} {
  const { task, setTask } = useTaskDataContext();

  const updateSkipTasklist = useCallback(
    (skip: boolean) => {
      setTask(
        produce((draft: Task) => {
          draft.skipTasklist = skip;
        })
      );
    },
    [setTask]
  );

  const updateDelay = useCallback(
    (delay: string) => {
      setTask(
        produce((draft: Task) => {
          draft.delay = delay;
        })
      );
    },
    [setTask]
  );

  return { task, updateSkipTasklist: updateSkipTasklist, updateDelay };
}

export function useTaskPersistData(): {
  data: PersistTaskData;
  updatePersist: (persist: boolean) => void;
} {
  const { data, setData } = useDataContext();

  const updatePersist = useCallback(
    (persist: boolean) => {
      setData(
        produce((draft: PersistTaskData) => {
          draft.config.persist = persist;
        })
      );
    },
    [setData]
  );

  return { data, updatePersist };
}
