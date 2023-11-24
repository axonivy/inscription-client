import type { FieldsetControl} from '../../widgets/index.js';
import { useFieldset } from '../../widgets/index.js';
import type { PartProps} from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { useEndPageData } from './useEndPageData.js';
import type { EndPageData } from '@axonivy/inscription-protocol';
import { useAction, useValidations } from '../../../context/index.js';
import { IvyIcons } from '@axonivy/editor-icons';
import { PathFieldset } from '../common/index.js';
import InputWithBrowser from '../../../components/widgets/input/InputWithBrowser.js';

export function useEndPagePart(): PartProps {
  const { config, initConfig, defaultConfig, update } = useEndPageData();
  const compareData = (data: EndPageData) => [data.page];
  const validations = useValidations(['page']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'End Page', state, reset: { dirty, action: () => update('page', initConfig.page) }, content: <EndPagePart /> };
}

const EndPagePart = () => {
  const { config, update } = useEndPageData();

  const action = useAction('openEndPage');
  const openFile: FieldsetControl = { label: 'Open file', icon: IvyIcons.GoToSource, action: () => action(config.page) };
  const pageFieldset = useFieldset();
  return (
    <PathFieldset label='Display the following page' {...pageFieldset.labelProps} controls={[openFile]} path='page'>
      <InputWithBrowser
        browsers={['cms']}
        typeFilter={'FILE'}
        value={config.page}
        onChange={change => update('page', change)}
        {...pageFieldset.inputProps}
      />
    </PathFieldset>
  );
};
