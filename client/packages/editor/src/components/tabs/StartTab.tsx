import { TabProps, TabState } from '../props';

export function useStartTab(): TabProps {
  return { name: 'Start', state: TabState.CONFIGURED, content: <StartTab /> };
}

const StartTab = () => <div>Content of Start</div>;
