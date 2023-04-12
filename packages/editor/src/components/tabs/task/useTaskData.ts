import { WfCustomField, WfLevel, WfActivatorType, WfTask } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';
import { useTaskDataContext } from '../../../context';
import { PriorityUpdater } from './priority/PrioritySelect';
import { ResponsibleUpdater } from './responsible/ResponsibleSelect';

export function useTaskData(): {
  task: WfTask;
  defaultTask: WfTask;
  updateName: Consumer<string>;
  updateDescription: Consumer<string>;
  updateCategory: Consumer<string>;
  updateCustomFields: Consumer<WfCustomField[]>;
  updateCode: Consumer<string>;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
} {
  const { task, defaultTask, setTask } = useTaskDataContext();

  const updateName = useCallback<Consumer<string>>(
    name =>
      setTask(
        produce(draft => {
          draft.name = name;
        })
      ),
    [setTask]
  );

  const updateDescription = useCallback<Consumer<string>>(
    description =>
      setTask(
        produce(draft => {
          draft.description = description;
        })
      ),
    [setTask]
  );

  const updateCategory = useCallback<Consumer<string>>(
    category =>
      setTask(
        produce(draft => {
          draft.category = category;
        })
      ),
    [setTask]
  );

  const updateCustomFields = useCallback<Consumer<WfCustomField[]>>(
    customFields =>
      setTask(
        produce(draft => {
          draft.customFields = customFields;
        })
      ),
    [setTask]
  );

  const updateCode = useCallback<Consumer<string>>(
    code =>
      setTask(
        produce(draft => {
          draft.code = code;
        })
      ),
    [setTask]
  );

  const updateType = useCallback<Consumer<WfActivatorType>>(
    type =>
      setTask(
        produce(draft => {
          draft.responsible.type = type;
        })
      ),
    [setTask]
  );

  const updateActivator = useCallback<Consumer<string>>(
    activator =>
      setTask(
        produce(draft => {
          draft.responsible.activator = activator;
        })
      ),
    [setTask]
  );

  const updateLevel = useCallback<Consumer<WfLevel>>(
    level =>
      setTask(
        produce(draft => {
          draft.priority.level = level;
        })
      ),
    [setTask]
  );

  const updateScript = useCallback<Consumer<string>>(
    script =>
      setTask(
        produce(draft => {
          draft.priority.script = script;
        })
      ),
    [setTask]
  );

  return {
    task,
    defaultTask,
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
