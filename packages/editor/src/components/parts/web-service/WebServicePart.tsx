import type { WebserviceStartData } from '@axonivy/inscription-protocol';
import type { PartProps } from '../../../components/editors';
import { usePartDirty, usePartState } from '../../../components/editors';
import { useEditorContext, useValidations } from '../../../context';
import { useWebServiceData } from './useWebServiceData';
import { Exception } from './Exception';
import { PID } from '../../../utils/pid';
import { Permission } from '../common/permission/Permission';
import { Message } from '@axonivy/ui-components';

export function useWebServicePart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useWebServiceData();
  const compareData = (data: WebserviceStartData) => [data];
  const validation = [...useValidations(['permission']), ...useValidations(['exception'])];
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Web Service', state, reset: { dirty, action: () => reset() }, content: <WebServicePart /> };
}

const WebServicePart = () => {
  const { elementContext, navigateTo } = useEditorContext();
  const { config, defaultConfig, updatePermission } = useWebServiceData();
  const navigateToProcess = () => navigateTo(PID.processId(elementContext.pid));

  return (
    <>
      <Message variant='info'>
        Web service authentication on the
        <a href='#' onClick={navigateToProcess}>
          process
        </a>
      </Message>
      <Permission
        anonymousFieldActive={false}
        config={config.permission}
        defaultConfig={defaultConfig.permission}
        updatePermission={updatePermission}
      />
      <Exception />
    </>
  );
};
