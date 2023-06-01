import { PartProps, usePartDirty, usePartState } from '../../props';
import { useTaskPersistData } from './options/useTaskOptionsData';
import TaskPart from './general/TaskPart';
import { useTaskData } from './useTaskData';
import { EmptyWidget } from '../../widgets';

export function useSingleTaskPart(options?: { showPersist?: boolean }): PartProps {
  const { task, defaultTask, initTask, resetTask } = useTaskData();
  const { persistData, defaultData, initData, updatePersist } = useTaskPersistData();
  const currentData = [task, options?.showPersist ? persistData.persist : ''];
  const state = usePartState([defaultTask, options?.showPersist ? defaultData.persist : ''], currentData, []);
  const dirty = usePartDirty([initTask, options?.showPersist ? initData.persist : ''], currentData);
  const resetData = () => {
    resetTask();
    if (options?.showPersist) {
      updatePersist(initData.persist);
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
