import { PartProps, usePartDirty, usePartState } from '../../props';
import { TaskPersistData, useTaskPersistData } from './options/useTaskOptionsData';
import TaskPart from './task/TaskPart';
import { useTaskData } from './useTaskData';
import { EmptyWidget } from '../../widgets';
import { WfTask } from '@axonivy/inscription-protocol';
import { usePartValidation } from '../../../context';

export function useSingleTaskPart(options?: { showPersist?: boolean }): PartProps {
  const { task, defaultTask, initTask, resetTask } = useTaskData();
  const { config, defaultConfig, initConfig, updatePersist } = useTaskPersistData();
  const validations = usePartValidation('task');
  const compareData = (task: WfTask, persist: TaskPersistData) => [task, options?.showPersist ? persist.persist : ''];
  const state = usePartState(compareData(defaultTask, defaultConfig), compareData(task, config), validations);
  const dirty = usePartDirty(compareData(initTask, initConfig), compareData(task, config));
  const resetData = () => {
    resetTask();
    if (options?.showPersist) {
      updatePersist(initConfig.persist);
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
    return <TaskPart showPersist={props.showPersist} />;
  }
  return <EmptyWidget message='There is no (Task) output flow connected.' />;
};
