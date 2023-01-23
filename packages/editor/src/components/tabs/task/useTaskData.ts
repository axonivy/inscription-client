import { CustomField, PriorityLevel, ResponsibleType, Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { useTaskDataContext } from '../../../context';
import { PriorityUpdater } from './priority/PrioritySelect';
import { ResponsibleUpdater } from './responsible/ResponsibleSelect';

export function useTaskData(): {
  task: Task;
  updateName: (name: string) => void;
  updateDescription: (description: string) => void;
  updateCategory: (category: string) => void;
  updateCustomFields: (customFields: CustomField[]) => void;
  updateCode: (code: string) => void;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
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

  const updateType = useCallback(
    (type: ResponsibleType) => {
      setTask(
        produce((draft: Task) => {
          if (!draft.responsible) {
            draft.responsible = {};
          }
          draft.responsible.type = type;
        })
      );
    },
    [setTask]
  );

  const updateActivator = useCallback(
    (activator: string) => {
      setTask(
        produce((draft: Task) => {
          if (!draft.responsible) {
            draft.responsible = {};
          }
          draft.responsible.activator = activator;
        })
      );
    },
    [setTask]
  );

  const updateLevel = useCallback(
    (level: PriorityLevel) => {
      setTask(
        produce((draft: Task) => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          if (!draft.expiry.priority) {
            draft.expiry.priority = {};
          }
          draft.expiry.priority.level = level;
        })
      );
    },
    [setTask]
  );

  const updateScript = useCallback(
    (script: string) => {
      setTask(
        produce((draft: Task) => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          if (!draft.expiry.priority) {
            draft.expiry.priority = {};
          }
          draft.expiry.priority.script = script;
        })
      );
    },
    [setTask]
  );

  return {
    task,
    updateName,
    updateDescription,
    updateCategory,
    updateCustomFields,
    updateCode,
    updateResponsible: {
      updateType,
      updateActivator
    },
    updatePriority: { updateLevel, updateScript }
  };
}
