import { IVY_SCRIPT_TYPES, WS_AUTH_TYPE, WebServiceProcessData, WsAuth } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../../components/editors';
import { useValidations } from '../../../context';
import { Input, Radio, useFieldset } from '../../../components/widgets';
import { useWebServiceProcessData } from './useWebServiceProcessData';
import { PathFieldset } from '../common';

export function useWebServiceProcessPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useWebServiceProcessData();
  const compareData = (data: WebServiceProcessData) => [data];
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
