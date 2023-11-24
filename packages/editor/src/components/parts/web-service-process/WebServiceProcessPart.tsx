import type { WebServiceProcessData, WsAuth } from '@axonivy/inscription-protocol';
import { IVY_SCRIPT_TYPES, WS_AUTH_TYPE } from '@axonivy/inscription-protocol';
import type { PartProps} from '../../../components/editors/index.js';
import { usePartDirty, usePartState } from '../../../components/editors/index.js';
import { useValidations } from '../../../context/index.js';
import { Input, Radio, useFieldset } from '../../../components/widgets/index.js';
import { useWebServiceProcessData } from './useWebServiceProcessData.js';
import { PathFieldset } from '../common/index.js';

export function useWebServiceProcessPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useWebServiceProcessData();
  const compareData = (data: WebServiceProcessData) => [data.wsAuth, data.wsTypeName];
  const validation = [...useValidations(['wsAuth']), ...useValidations(['wsTypeName'])];
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Web Service Process', state, reset: { dirty, action: () => reset() }, content: <WebServiceProcessPart /> };
}

const WebServiceProcessPart = () => {
  const { config, update } = useWebServiceProcessData();

  const qualifiedNameField = useFieldset();
  const authField = useFieldset();

  return (
    <>
      <PathFieldset label='Qualified name' {...qualifiedNameField.labelProps} path='wsTypeName'>
        <Input
          value={config.wsTypeName}
          onChange={change => update('wsTypeName', change)}
          type={IVY_SCRIPT_TYPES.STRING}
          {...qualifiedNameField.inputProps}
        />
      </PathFieldset>
      <PathFieldset label='Authentication' {...authField.labelProps} path='wsAuth'>
        <Radio
          value={config.wsAuth}
          onChange={change => update('wsAuth', change as WsAuth)}
          items={Object.entries(WS_AUTH_TYPE).map(([value, label]) => ({ label, value }))}
          {...authField.inputProps}
        />
      </PathFieldset>
    </>
  );
};
