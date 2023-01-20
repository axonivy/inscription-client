import { Priority, PriorityLevel, Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { useTaskDataContext } from '../../../../context';

export function usePriorityData(expiry?: boolean): {
  priority: Priority;
  updateLevel: (level: PriorityLevel) => void;
  updateScript: (script: string) => void;
} {
  const { task, setTask } = useTaskDataContext();

  const getPriority = useCallback(() => {
    if (expiry) {
      return task.expiry?.priority ?? {};
    } else {
      return task.priority ?? {};
    }
  }, [task, expiry]);

  const priority = getPriority();

  const setPriority = useCallback(
    (update: (priority: Priority) => Priority) => {
      setTask(
        produce((draft: Task) => {
          if (expiry !== undefined) {
            if (!draft.expiry) {
              draft.expiry = {};
            }
            draft.expiry.priority = update(getPriority());
          } else {
            draft.priority = update(getPriority());
          }
        })
      );
    },
    [getPriority, setTask, expiry]
  );

  const updateLevel = useCallback(
    (level: PriorityLevel) => {
      setPriority(
        produce((draft: Priority) => {
          draft.level = level;
        })
      );
    },
    [setPriority]
  );

  const updateScript = useCallback(
    (script: string) => {
      setPriority(
        produce((draft: Priority) => {
          draft.script = script;
        })
      );
    },
    [setPriority]
  );

  return { priority, updateLevel, updateScript };
}
