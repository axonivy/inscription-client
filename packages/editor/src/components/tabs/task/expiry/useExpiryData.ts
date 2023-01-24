import { PriorityLevel, ResponsibleType, Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../../types/lambda';
import { useTaskDataContext } from '../../../../context';
import { PriorityUpdater } from '../priority/PrioritySelect';
import { ResponsibleUpdater } from '../responsible/ResponsibleSelect';

export function useExpiryData(): {
  task: Task;
  updateTimeout: Consumer<string>;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
} {
  const { task, setTask } = useTaskDataContext();

  const updateTimeout = useCallback<Consumer<string>>(
    timeout =>
      setTask(
        produce<Task>(draft => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          draft.expiry.timeout = timeout;
        })
      ),
    [setTask]
  );

  const updateType = useCallback<Consumer<ResponsibleType>>(
    type =>
      setTask(
        produce<Task>(draft => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          if (!draft.expiry.responsible) {
            draft.expiry.responsible = {};
          }
          draft.expiry.responsible.type = type;
        })
      ),
    [setTask]
  );

  const updateActivator = useCallback<Consumer<string>>(
    activator =>
      setTask(
        produce<Task>(draft => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          if (!draft.expiry.responsible) {
            draft.expiry.responsible = {};
          }
          draft.expiry.responsible.activator = activator;
        })
      ),
    [setTask]
  );

  const updateLevel = useCallback<Consumer<PriorityLevel>>(
    level =>
      setTask(
        produce<Task>(draft => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          if (!draft.expiry.priority) {
            draft.expiry.priority = {};
          }
          draft.expiry.priority.level = level;
        })
      ),
    [setTask]
  );

  const updateScript = useCallback<Consumer<string>>(
    script =>
      setTask(
        produce<Task>(draft => {
          if (!draft.expiry) {
            draft.expiry = {};
          }
          if (!draft.expiry.priority) {
            draft.expiry.priority = {};
          }
          draft.expiry.priority.script = script;
        })
      ),
    [setTask]
  );

  return { task, updateTimeout, updateResponsible: { updateType, updateActivator }, updatePriority: { updateLevel, updateScript } };
}
