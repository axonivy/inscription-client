import { TabProps } from '../props';

export function useResultTab(): TabProps {
  return { name: 'Result', content: <ResultTab /> };
}

const ResultTab = () => <>Content of Result</>;
