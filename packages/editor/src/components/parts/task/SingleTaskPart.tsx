import { PartProps, usePartState } from '../../props';
import { useTaskPersistData } from './options/useTaskOptionsData';
import TaskPart from './general/TaskPart';
import { useTaskData } from './useTaskData';
import { EmptyWidget } from '../../widgets';

export function useSingleTaskPart(options?: { showPersist?: boolean }): PartProps {
  const { task, defaultTask } = useTaskData();
  const { persistData, defaultData } = useTaskPersistData();
  const state = usePartState(
    [defaultTask, options?.showPersist ? defaultData.persist : ''],
    [task, options?.showPersist ? persistData.persist : ''],
    []
  );
  return { name: 'Task', state, content: <SingleTaskPart showPersist={options?.showPersist} /> };
}

const SingleTaskPart = (props: { showPersist?: boolean }) => {
  const { defaultTask } = useTaskData();
  if (defaultTask) {
    return <TaskPart showPersist={props.showPersist} />;
  }
  return <EmptyWidget message='There is no (Task) output flow connected.' />;
};
