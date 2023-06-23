import { useCallback } from 'react';
import { useNameSyncher } from '../name/useNameSyncher';
import { StartData } from '@axonivy/inscription-protocol';

export function useStartNameSyncher(startData: StartData, parameters?: boolean) {
  const nameSynchCallback = useCallback(() => {
    if (parameters) {
      return `${startData.signature}(${startData.input.params
        .map(param => param.type.substring(param.type.lastIndexOf('.') + 1))
        .join(',')})`;
    }
    return startData.signature;
  }, [startData.input.params, startData.signature, parameters]);

  useNameSyncher(nameSynchCallback);
}
