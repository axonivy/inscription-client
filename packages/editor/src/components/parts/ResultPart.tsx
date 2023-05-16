import { PartProps } from '../props';

export function useResultPart(): PartProps {
  return { name: 'Result', content: <ResultPart /> };
}

const ResultPart = () => <>Content of Result</>;
