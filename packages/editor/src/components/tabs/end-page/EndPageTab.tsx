import { LabelInput } from '../../../components/widgets';
import { useReadonly } from '../../../context';
import { TabProps, useTabState } from '../../props';
import { useEndPageData } from './useEndPageData';

export function useEndPageTab(): TabProps {
  const { data, defaultData } = useEndPageData();
  const tabState = useTabState([defaultData.page], [data.page], []);
  return { name: 'End Page', state: tabState, content: <EndPageTab /> };
}

const EndPageTab = () => {
  const { data, updatePage } = useEndPageData();
  const readonly = useReadonly();
  return (
    <>
      <LabelInput label='Display the following page' htmlFor='endPageInput'>
        <input
          id='endPageInput'
          className='input'
          value={data.page}
          onChange={event => updatePage(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
    </>
  );
};
