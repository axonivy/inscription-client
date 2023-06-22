import { useNameData } from '../name/useNameData';
import { useCallback, useEffect, useState } from 'react';

export function useDefaultNameSyncher({ synchName }: { synchName: string }) {
  const nameSyncher = useCallback(() => synchName, [synchName]);
  useNameSyncher(nameSyncher);
}

export function useNameSyncher(syncher: () => string) {
  const { data, update } = useNameData();
  const [isInSynch, setInSynch] = useState<boolean>();

  useEffect(() => {
    if (isInSynch) {
      update('name', syncher());
    }
  }, [isInSynch, update, syncher]);

  useEffect(() => {
    setInSynch(data.name === syncher());
  }, [data.name, syncher]);
}
