import { PriorityLevel, ResponsibleType, Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { useTaskDataContext } from '../../../../context';
import { PriorityUpdater } from '../priority/PrioritySelect';
import { ResponsibleUpdater } from '../responsible/ResponsibleSelect';

export function useExpiryData(): {
  task: Task;
  updateTimeout: (timeout: string) => void;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
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

  const updateType = useCallback(
    (type: ResponsibleType) => {
      setTask(
        produce((draft: Task) => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          if (!draft.expiry.responsible) {
            draft.expiry.responsible = {};
          }
          draft.expiry.responsible.type = type;
        })
      );
    },
    [setTask]
  );

  const updateActivator = useCallback(
    (activator: string) => {
      setTask(
        produce((draft: Task) => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          if (!draft.expiry.responsible) {
            draft.expiry.responsible = {};
          }
          draft.expiry.responsible.activator = activator;
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

  return { task, updateTimeout, updateResponsible: { updateType, updateActivator }, updatePriority: { updateLevel, updateScript } };
}
