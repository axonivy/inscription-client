import { WebserviceStartData } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../../components/editors';
import { useValidations } from '../../../context';
import { useWebServiceData } from './useWebServiceData';
import { Permission } from './Permission';
import { Exception } from './Exception';

export function useWebServicePart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useWebServiceData();
  const compareData = (data: WebserviceStartData) => [data];
  const validation = [...useValidations(['permission']), ...useValidations(['exception'])];
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Web Service', state, reset: { dirty, action: () => reset() }, content: <WebServicePart /> };
}

const WebServicePart = () => {
  return (
    <>
      <Permission></Permission>
      <Exception></Exception>
    </>
  );
};
