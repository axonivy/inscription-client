import { TabProps, useTabState } from '../../props';
import { useTaskPersistData } from './options/useTaskOptionsData';
import TaskPart from './general/TaskPart';
import { useTaskData } from './useTaskData';

export function useTaskTab(options?: { showPersist?: boolean }): TabProps {
  const { task, defaultTask } = useTaskData();
  const { persistData, defaultData } = useTaskPersistData();
  const tabState = useTabState(
    [defaultTask, options?.showPersist ? defaultData.persist : ''],
    [task, options?.showPersist ? persistData.persist : ''],
    []
  );
  return { name: 'Task', state: tabState, content: <TaskTab showPersist={options?.showPersist} /> };
}

const TaskTab = (props: { showPersist?: boolean }) => {
  return <TaskPart showPersist={props.showPersist} />;
};
