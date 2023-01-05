import { TabProps, TabState } from '../props';

export function useOutputTab(): TabProps {
  return { name: 'Output', state: TabState.CONFIGURED, content: <OutputTab /> };
}

const OutputTab = () => <div>Content of Output</div>;
