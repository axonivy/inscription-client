import { WsRequestData } from '@axonivy/inscription-protocol';
import { useValidations } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useWsRequestData } from './useWsRequestData';
import { WsClientSelect } from './WsClientSelect';
import { WsPortSelect } from './WsPortSelect';
import { WsOperationSelect } from './WsOperationSelect';
import { WsProperties } from './WsProperties';
import { WsMapping } from './WsMapping';

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
