import { TabProps } from '../props';

export function useEndPageTab(): TabProps {
  return { name: 'End Page', content: <EndPageTab /> };
}

const EndPageTab = () => {
  return <>Content of End Page</>;
};
