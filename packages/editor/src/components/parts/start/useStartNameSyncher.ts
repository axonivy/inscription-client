import { useCallback } from 'react';
import { useNameSyncher } from '../name/useNameSyncher';
import { StartData } from '@axonivy/inscription-protocol';

export function useStartNameSyncher(startData: StartData, signaturePostfix?: string) {
  const nameSynchCallback = useCallback(() => {
    if (signaturePostfix) {
      return `${startData.signature}${signaturePostfix}`;
    }
    return `${startData.signature}(${startData.input.params
      .map(param => param.type.substring(param.type.lastIndexOf('.') + 1))
      .join(',')})`;
  }, [startData.input.params, startData.signature, signaturePostfix]);

  useNameSyncher(nameSynchCallback);
}
