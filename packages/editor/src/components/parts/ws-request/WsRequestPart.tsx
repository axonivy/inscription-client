import type { WsRequestData } from '@axonivy/inscription-protocol';
import { useValidations } from '../../../context/index.js';
import type { PartProps} from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { useWsRequestData } from './useWsRequestData.js';
import { WsClientSelect } from './WsClientSelect.js';
import { WsPortSelect } from './WsPortSelect.js';
import { WsOperationSelect } from './WsOperationSelect.js';
import { WsProperties } from './WsProperties.js';
import { WsMapping } from './WsMapping.js';

export function useWsRequestPart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useWsRequestData();
  const validations = [...useValidations(['clientId']), ...useValidations(['operation']), ...useValidations(['properties'])];
  const compareData = (data: WsRequestData) => [data.clientId, data.operation, data.properties];
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Request', state: state, reset: { dirty, action: () => resetData() }, content: <WsRequestPart /> };
}

const WsRequestPart = () => {
  return (
    <>
      <WsClientSelect />
      <WsPortSelect />
      <WsOperationSelect />
      <WsProperties />
      <WsMapping />
    </>
  );
};
