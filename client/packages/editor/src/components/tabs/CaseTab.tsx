import { TabProps, TabState } from '../props';

export function useCaseTab(): TabProps {
  return { name: 'Case', state: TabState.CONFIGURED, content: <CaseTab /> };
}

const CaseTab = () => <div>Content of Case</div>;
