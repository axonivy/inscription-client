import { Fieldset, Input } from '../../../components/widgets';
import { TabProps, useTabState } from '../../props';
import { useEndPageData } from './useEndPageData';

export function useEndPageTab(): TabProps {
  const { data, defaultData } = useEndPageData();
  const tabState = useTabState([defaultData.page], [data.page], []);
  return { name: 'End Page', state: tabState, content: <EndPageTab /> };
}

const EndPageTab = () => {
  const { data, updatePage } = useEndPageData();
  return (
    <>
      <Fieldset label='Display the following page' htmlFor='endPageInput'>
        <Input id='endPageInput' value={data.page} onChange={change => updatePage(change)} />
      </Fieldset>
    </>
  );
};
