import { WebserviceStartData } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../../components/editors';
import { useEditorContext, useValidations } from '../../../context';
import { useWebServiceData } from './useWebServiceData';
import { Permission } from './Permission';
import { Exception } from './Exception';
import { MessageText } from '../../../components/widgets';
import { PID } from '../../../utils/pid';

export function useWebServicePart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useWebServiceData();
  const compareData = (data: WebserviceStartData) => [data];
  const validation = [...useValidations(['permission']), ...useValidations(['exception'])];
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Web Service', state, reset: { dirty, action: () => reset() }, content: <WebServicePart /> };
}

const WebServicePart = () => {
  const { context } = useEditorContext();
  const navigateToProcess = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('pid', PID.processId(context.pid));
    window.location.replace(url);
  };

  return (
    <>
      <MessageText message={{ message: 'Web service authentication on the', severity: 'INFO' }}>
        <a href='#' onClick={navigateToProcess}>
          process
        </a>
      </MessageText>
      <Permission></Permission>
      <Exception></Exception>
    </>
  );
};
