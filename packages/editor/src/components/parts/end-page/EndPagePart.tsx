import { Fieldset, Input } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useEndPageData } from './useEndPageData';
import { EndPageData } from '@axonivy/inscription-protocol';

export function useEndPagePart(): PartProps {
  const { config, initConfig, defaultConfig, updatePage } = useEndPageData();
  const compareData = (data: EndPageData) => [data.page];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'End Page', state, reset: { dirty, action: () => updatePage(initConfig.page) }, content: <EndPagePart /> };
}

const EndPagePart = () => {
  const { config, updatePage } = useEndPageData();
  return (
    <>
      <Fieldset label='Display the following page' htmlFor='endPageInput'>
        <Input id='endPageInput' value={config.page} onChange={change => updatePage(change)} />
      </Fieldset>
    </>
  );
};
