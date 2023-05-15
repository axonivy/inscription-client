import { PartProps } from '../props';

export function useStartPart(): PartProps {
  return { name: 'Start', content: <StartPart /> };
}

const StartPart = () => <>Content of Start</>;
