import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { useData, useValidation } from '../../../context';
import { TabProps, useTabState } from '../../props';
import Task from './Task';

function useTaskTabValidation(): InscriptionValidation[] {
  const task = useValidation('config/task');
  return [task];
}

export function useTaskTab(options?: { showPersist?: boolean }): TabProps {
  const [initData, data] = useData('config/task');
  const validation = useTaskTabValidation();
  const tabState = useTabState(initData, data, validation);
  return {
    name: 'Task',
    state: tabState,
    content: <TaskTab showPersist={options?.showPersist} />
  };
}

const TaskTab = (props: { showPersist?: boolean }) => {
  return <Task showPersist={props.showPersist} />;
};
