import { TabProps, TabState } from '../props';

export function useEndPageTab(): TabProps {
  return { name: 'End Page', state: TabState.EMPTY, content: <EndPageTab /> };
}

const EndPageTab = () => {
  return <>Content of End Page</>;
};
