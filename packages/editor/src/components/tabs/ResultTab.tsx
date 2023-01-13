import { TabProps, TabState } from '../props';

export function useResultTab(): TabProps {
  return { name: 'Result', state: TabState.CONFIGURED, content: <ResultTab /> };
}

const ResultTab = () => <>Content of Result</>;
