import { RestRequestData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useRestRequestData } from './useRestRequestData';
import { RestClientSelect } from './rest-target/RestClientSelect';
import { RestMethodSelect } from './rest-target/RestMethodSelect';
import { RestProperties } from './rest-target/RestProperties';
import { RestHeaders } from './rest-target/RestHeaders';
import { RestParameters } from './rest-target/RestParameters';
import { RestTargetUrl } from './rest-target/RestTargetUrl';

export function useRestRequestPart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useRestRequestData();
  const validations = [
    ...useValidations(['method']),
    ...useValidations(['target']),
    ...useValidations(['body']),
    ...useValidations(['code'])
  ];
  const compareData = (data: RestRequestData) => [data.body, data.code, data.method, data.target];
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Request', state: state, reset: { dirty, action: () => resetData() }, content: <RestRequestPart /> };
}

const RestRequestPart = () => {
  return (
    <PathContext path='target'>
      <RestTargetUrl />
      <RestClientSelect />
      <RestMethodSelect />
      <RestParameters />
      <RestHeaders />
      <RestProperties />
    </PathContext>
  );
};
