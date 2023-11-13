import type { FieldsetControl} from '../../widgets';
import { useFieldset } from '../../widgets';
import type { PartProps} from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useEndPageData } from './useEndPageData';
import type { EndPageData } from '@axonivy/inscription-protocol';
import { useAction, useValidations } from '../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import { PathFieldset } from '../common';
import InputWithBrowser from '../../../components/widgets/input/InputWithBrowser';

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
