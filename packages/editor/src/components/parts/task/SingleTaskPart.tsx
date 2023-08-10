import { PartProps, usePartDirty, usePartState } from '../../editors';
import { TaskPersistData, useTaskPersistData } from './options/useTaskOptionsData';
import TaskPart from './task/TaskPart';
import { useTaskData } from './useTaskData';
import { EmptyWidget } from '../../widgets';
import { WfTask } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';

export function useSingleTaskPart(options?: { showPersist?: boolean }): PartProps {
  const { task, defaultTask, initTask, resetTask } = useTaskData();
  const { config, defaultConfig, initConfig, updatePersist } = useTaskPersistData();
  let validations = useValidations(['task']);
  if (options?.showPersist) {
    validations = validations.filter(val => !val.path.startsWith('task.responsible')).filter(val => !val.path.startsWith('task.delay'));
  }
  const compareData = (task: WfTask, persist: TaskPersistData) => [task, options?.showPersist ? persist.persistOnStart : ''];
  const state = usePartState(compareData(defaultTask, defaultConfig), compareData(task, config), validations);
  const dirty = usePartDirty(compareData(initTask, initConfig), compareData(task, config));
  const resetData = () => {
    resetTask();
    if (options?.showPersist) {
      updatePersist(initConfig.persistOnStart);
    }
  };
  return {
    name: 'Task',
    state,
    reset: { dirty, action: () => resetData() },
    content: <SingleTaskPart showPersist={options?.showPersist} />
  };
}

const SingleTaskPart = (props: { showPersist?: boolean }) => {
  const { defaultTask } = useTaskData();
  if (defaultTask) {
    return (
      <PathContext path='task'>
        <TaskPart showPersist={props.showPersist} />
      </PathContext>
    );
  }
  return <EmptyWidget message='There is no (Task) output flow connected.' />;
};
