import { TabProps, TabState } from '../props';

export function useTaskTab(): TabProps {
  return { name: 'Task', state: TabState.CONFIGURED, content: <TaskTab /> };
}

const TaskTab = () => <div>Content of Task</div>;
