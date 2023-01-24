import { TabProps } from '../props';

export function useStartTab(): TabProps {
  return { name: 'Start', content: <StartTab /> };
}

const StartTab = () => <>Content of Start</>;
