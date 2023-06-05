import { StartData } from '@axonivy/inscription-protocol';
import { useNameData } from '../name/useNameData';
import { useCallback, useEffect, useState } from 'react';

export function useNameSyncher(startData: StartData, signaturePostfix?: string) {
  const { data, updateName } = useNameData();
  const [isInSynch, setInSynch] = useState<boolean>();

  const signatureEnricher = useCallback(
    (signature: string) => {
      if (signaturePostfix) {
        return `${signature}${signaturePostfix}`;
      }
      return `${signature}(${startData.input.params.map(param => param.type.substring(param.type.lastIndexOf('.') + 1)).join(',')})`;
    },
    [startData.input.params, signaturePostfix]
  );

  useEffect(() => {
    if (isInSynch) {
      updateName(signatureEnricher(startData.signature));
    }
  }, [startData.signature, isInSynch, signatureEnricher, updateName]);

  useEffect(() => {
    setInSynch(data.name === signatureEnricher(startData.signature));
  }, [startData.signature, data.name, signatureEnricher]);
}
