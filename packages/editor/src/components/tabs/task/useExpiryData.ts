import { Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { useTaskDataContext } from '../../../context';

export function useExpiryData(): {
  task: Task;
  updateTimeout: (timeout: string) => void;
} {
  const { task, setTask } = useTaskDataContext();

  const updateTimeout = useCallback(
    (timeout: string) => {
      setTask(
        produce((draft: Task) => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          draft.expiry.timeout = timeout;
        })
      );
    },
    [setTask]
  );

  return { task, updateTimeout };
}
