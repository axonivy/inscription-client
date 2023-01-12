import { TabProps, TabState } from '../props';

export function useStartTab(): TabProps {
  return { name: 'Start', state: TabState.CONFIGURED, content: <StartTab /> };
}

const StartTab = () => <>Content of Start</>;
