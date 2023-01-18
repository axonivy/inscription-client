import { Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { useTaskDataContext } from '../../../../context';

export function useErrorData(): {
  task: Task;
  updateError: (error: string) => void;
} {
  const { task, setTask } = useTaskDataContext();

  const updateError = useCallback(
    (error: string) => {
      setTask(
        produce((draft: Task) => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          draft.expiry.error = error;
        })
      );
    },
    [setTask]
  );

  return { task, updateError };
}
