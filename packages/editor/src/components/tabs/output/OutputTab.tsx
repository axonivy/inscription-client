import { TabProps } from '../../props';

export function useOutputTab(): TabProps {
  return { name: 'Output', content: <OutputTab /> };
}

const OutputTab = () => <>Content of Output</>;
