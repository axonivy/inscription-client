import { DEFAULT_TASK, DEFAULT_TASK_DATA } from '@axonivy/inscription-protocol';
import { TabProps, useTabState } from '../../props';
import { useTaskPersistData } from './options/useTaskOptionsData';
import TaskPart from './TaskPart';
import { useTaskData } from './useTaskData';

export function useTaskTab(options?: { showPersist?: boolean }): TabProps {
  const { task } = useTaskData();
  const { persistData } = useTaskPersistData();
  const tabState = useTabState(
    [DEFAULT_TASK, options?.showPersist ? DEFAULT_TASK_DATA.persist : ''],
    [task, options?.showPersist ? persistData.persist : ''],
    []
  );
  return { name: 'Task', state: tabState, content: <TaskTab showPersist={options?.showPersist} /> };
}

const TaskTab = (props: { showPersist?: boolean }) => {
  return <TaskPart showPersist={props.showPersist} />;
};
