import { WfExpiry, WfLevel, WfActivatorType } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../../types/lambda';
import { useTaskDataContext } from '../../../../context';
import { PriorityUpdater } from '../priority/PrioritySelect';
import { ResponsibleUpdater } from '../responsible/ResponsibleSelect';

export function useExpiryData(): {
  expiry: WfExpiry;
  updateTimeout: Consumer<string>;
  updateError: Consumer<string>;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
} {
  const { task, setTask } = useTaskDataContext();

  const updateTimeout = useCallback<Consumer<string>>(
    timeout =>
      setTask(
        produce(draft => {
          draft.expiry.timeout = timeout;
        })
      ),
    [setTask]
  );

  const updateError = useCallback<Consumer<string>>(
    error =>
      setTask(
        produce(draft => {
          draft.expiry.error = error;
        })
      ),
    [setTask]
  );

  const updateType = useCallback<Consumer<WfActivatorType>>(
    type =>
      setTask(
        produce(draft => {
          draft.expiry.responsible.type = type;
        })
      ),
    [setTask]
  );

  const updateActivator = useCallback<Consumer<string>>(
    activator =>
      setTask(
        produce(draft => {
          draft.expiry.responsible.activator = activator;
        })
      ),
    [setTask]
  );

  const updateLevel = useCallback<Consumer<WfLevel>>(
    level =>
      setTask(
        produce(draft => {
          draft.expiry.priority.level = level;
        })
      ),
    [setTask]
  );

  const updateScript = useCallback<Consumer<string>>(
    script =>
      setTask(
        produce(draft => {
          draft.expiry.priority.script = script;
        })
      ),
    [setTask]
  );

  return {
    expiry: task.expiry,
    updateTimeout,
    updateError,
    updateResponsible: { updateType, updateActivator },
    updatePriority: { updateLevel, updateScript }
  };
}
