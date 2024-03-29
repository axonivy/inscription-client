import type { WebserviceStartData } from '@axonivy/inscription-protocol';
import type { PartProps } from '../../../components/editors';
import { usePartDirty, usePartState } from '../../../components/editors';
import { useEditorContext, useValidations } from '../../../context';
import { useWebServiceData } from './useWebServiceData';
import { Exception } from './Exception';
import { MessageText } from '../../../components/widgets';
import { PID } from '../../../utils/pid';
import { Permission } from '../common/permission/Permission';

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
      <MessageText message={{ message: 'Web service authentication on the', severity: 'INFO' }}>
        <a href='#' onClick={navigateToProcess}>
          process
        </a>
      </MessageText>
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
