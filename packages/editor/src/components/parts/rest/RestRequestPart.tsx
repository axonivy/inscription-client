import type { HttpMethod, RestRequestData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useRestRequestData } from './useRestRequestData';
import { RestClientSelect } from './rest-request/rest-target/RestClientSelect';
import { RestMethodSelect } from './rest-request/rest-target/RestMethodSelect';
import { RestProperties } from './rest-request/rest-target/RestProperties';
import { RestHeaders } from './rest-request/rest-target/RestHeaders';
import { RestParameters } from './rest-request/rest-target/RestParameters';
import { RestTargetUrl } from './rest-request/rest-target/RestTargetUrl';
import { RestJaxRsCode } from './rest-request/rest-body/RestJaxRsCode';
import { RestBody } from './rest-request/rest-body/RestBody';
import { ValidationCollapsible } from '../common';

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
  const { config, defaultConfig } = useRestRequestData();

  const bodyPart = (method: HttpMethod) => {
    switch (method) {
      case 'POST':
      case 'PUT':
      case 'PATCH':
        return <RestBody />;
      case 'JAX_RS':
        return <RestJaxRsCode />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <PathContext path='target'>
        <ValidationCollapsible label='Rest Service' defaultOpen={config.target.clientId !== defaultConfig.target.clientId}>
          <RestTargetUrl />
          <RestClientSelect />
          <RestMethodSelect />
        </ValidationCollapsible>
        <RestParameters />
        <RestHeaders />
        <RestProperties />
      </PathContext>
      {bodyPart(config.method)}
    </>
  );
};
