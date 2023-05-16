import { Fieldset, Input } from '../../widgets';
import { PartProps, usePartState } from '../../props';
import { useEndPageData } from './useEndPageData';

export function useEndPagePart(): PartProps {
  const { data, defaultData } = useEndPageData();
  const state = usePartState([defaultData.page], [data.page], []);
  return { name: 'End Page', state, content: <EndPagePart /> };
}

const EndPagePart = () => {
  const { data, updatePage } = useEndPageData();
  return (
    <>
      <Fieldset label='Display the following page' htmlFor='endPageInput'>
        <Input id='endPageInput' value={data.page} onChange={change => updatePage(change)} />
      </Fieldset>
    </>
  );
};
