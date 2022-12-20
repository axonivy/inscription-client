import { TabProps, TabState } from '../props';

export function useResultTab(): TabProps {
  return { name: 'Result', state: TabState.CONFIGURED, content: <ResultTab /> };
}

const ResultTab = () => <div>Content of Result</div>;
