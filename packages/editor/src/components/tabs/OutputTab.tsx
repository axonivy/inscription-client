import { TabProps, TabState } from '../props';

export function useOutputTab(): TabProps {
  return { name: 'Output', state: TabState.CONFIGURED, content: <OutputTab /> };
}

const OutputTab = () => <>Content of Output</>;
