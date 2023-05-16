import { WfTask as TaskData } from '@axonivy/inscription-protocol';
import { EmptyWidget, Tab } from '../../widgets';
import { TaskDataContextInstance, useConfigDataContext } from '../../../context';
import { PartProps, usePartState } from '../../props';
import TaskPart from './general/TaskPart';

export function useMultiTasksPart(): PartProps {
  const { config, defaultData } = useConfigDataContext();
  const state = usePartState(defaultData.tasks, config.tasks, []);
  return { name: 'Tasks', state, content: <MultiTasksPart /> };
}

const MultiTasksPart = () => {
  const { config } = useConfigDataContext();

  const tabs: PartProps[] =
    config.tasks?.map((task: TaskData, index: any) => {
      return {
        name: task.id ?? '',
        content: (
          <TaskDataContextInstance.Provider value={index}>
            <TaskPart />
          </TaskDataContextInstance.Provider>
        )
      } as PartProps;
    }) ?? [];

  return <>{tabs.length > 0 ? <Tab tabs={tabs} /> : <EmptyWidget message='There is no (Task) output flow connected.' />}</>;
};
