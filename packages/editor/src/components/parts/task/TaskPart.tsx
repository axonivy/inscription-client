import type { PartProps} from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import type { TaskPersistData} from './options/usePersistOptionsData.js';
import { useTaskPersistData } from './options/usePersistOptionsData.js';
import Task from './task/Task.js';
import { useTaskData } from './useTaskData.js';
import { EmptyWidget } from '../../widgets/index.js';
import type { WfTask } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context/index.js';
import RequestTask from './task/RequestTask.js';
import WaitTask from './task/WaitTask.js';
import WsTask from './task/WsTask.js';

export function useTaskPart(options?: TaskPartProps): PartProps {
  const { task, defaultTask, initTask, resetTask } = useTaskData();
  const { config, defaultConfig, initConfig, updatePersist } = useTaskPersistData();
  let validations = useValidations(['task']);
  const isStartRequest = options?.type === 'request';
  if (isStartRequest) {
    validations = validations.filter(val => !val.path.startsWith('task.responsible')).filter(val => !val.path.startsWith('task.delay'));
  }
  const compareData = (task: WfTask, persist: TaskPersistData) => [task, isStartRequest ? persist.persistOnStart : ''];
  const state = usePartState(compareData(defaultTask, defaultConfig), compareData(task, config), validations);
  const dirty = usePartDirty(compareData(initTask, initConfig), compareData(task, config));
  const resetData = () => {
    resetTask();
    if (isStartRequest) {
      updatePersist(initConfig.persistOnStart);
    }
  };
  return {
    name: 'Task',
    state,
    reset: { dirty, action: () => resetData() },
    content: <TaskPart type={options?.type} />
  };
}

export type TaskPartProps = {
  type?: 'request' | 'wait' | 'ws';
};

const TaskPart = ({ type }: TaskPartProps) => {
  const { defaultTask } = useTaskData();
  const task = (type: TaskPartProps['type']) => {
    switch (type) {
      case 'request':
        return <RequestTask />;
      case 'wait':
        return <WaitTask />;
      case 'ws':
        return <WsTask />;
      default:
        return <Task />;
    }
  };
  if (defaultTask) {
    return <PathContext path='task'>{task(type)}</PathContext>;
  }
  return <EmptyWidget message='There is no (Task) output flow connected.' />;
};
