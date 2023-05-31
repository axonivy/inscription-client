import { Fieldset, Input } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useEndPageData } from './useEndPageData';

export function useEndPagePart(): PartProps {
  const { data, initData, defaultData, updatePage } = useEndPageData();
  const state = usePartState(defaultData.page, data.page, []);
  const dirty = usePartDirty(initData.page, data.page);
  return { name: 'End Page', state, reset: { dirty, action: () => updatePage(initData.page) }, content: <EndPagePart /> };
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
