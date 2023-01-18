import { CustomField, Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { useTaskDataContext } from '../../../context';

export function useTaskData(): {
  task: Task;
  updateName: (name: string) => void;
  updateDescription: (description: string) => void;
  updateCategory: (category: string) => void;
  updateCustomFields: (customFields: CustomField[]) => void;
  updateCode: (code: string) => void;
} {
  const { task, setTask } = useTaskDataContext();

  const updateName = useCallback(
    (name: string) => {
      setTask(
        produce((draft: Task) => {
          draft.name = name;
        })
      );
    },
    [setTask]
  );

  const updateDescription = useCallback(
    (description: string) => {
      setTask(
        produce((draft: Task) => {
          draft.description = description;
        })
      );
    },
    [setTask]
  );

  const updateCategory = useCallback(
    (category: string) => {
      setTask(
        produce((draft: Task) => {
          draft.category = category;
        })
      );
    },
    [setTask]
  );

  const updateCustomFields = useCallback(
    (customFields: CustomField[]) => {
      setTask(
        produce((draft: Task) => {
          draft.customFields = customFields;
        })
      );
    },
    [setTask]
  );

  const updateCode = useCallback(
    (code: string) => {
      setTask(
        produce((draft: Task) => {
          draft.code = code;
        })
      );
    },
    [setTask]
  );

  return { task, updateName, updateDescription, updateCategory, updateCustomFields, updateCode };
}
