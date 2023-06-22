import { Fieldset, Input } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useEndPageData } from './useEndPageData';
import { EndPageData } from '@axonivy/inscription-protocol';

export function useEndPagePart(): PartProps {
  const { config, initConfig, defaultConfig, update } = useEndPageData();
  const compareData = (data: EndPageData) => [data.page];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'End Page', state, reset: { dirty, action: () => update('page', initConfig.page) }, content: <EndPagePart /> };
}

const EndPagePart = () => {
  const { config, update } = useEndPageData();
  return (
    <>
      <Fieldset label='Display the following page' htmlFor='endPageInput'>
        <Input id='endPageInput' value={config.page} onChange={change => update('page', change)} />
      </Fieldset>
    </>
  );
};
