import type { HttpMethod, RestRequestData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context/index.js';
import type { PartProps} from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { useRestRequestData } from './useRestRequestData.js';
import { RestClientSelect } from './rest-request/rest-target/RestClientSelect.js';
import { RestMethodSelect } from './rest-request/rest-target/RestMethodSelect.js';
import { RestProperties } from './rest-request/rest-target/RestProperties.js';
import { RestHeaders } from './rest-request/rest-target/RestHeaders.js';
import { RestParameters } from './rest-request/rest-target/RestParameters.js';
import { RestTargetUrl } from './rest-request/rest-target/RestTargetUrl.js';
import { RestJaxRsCode } from './rest-request/rest-body/RestJaxRsCode.js';
import { RestBody } from './rest-request/rest-body/RestBody.js';

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
  const { config } = useRestRequestData();

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
        <RestTargetUrl />
        <RestClientSelect />
        <RestMethodSelect />
        <RestParameters />
        <RestHeaders />
        <RestProperties />
      </PathContext>
      {bodyPart(config.method)}
    </>
  );
};
