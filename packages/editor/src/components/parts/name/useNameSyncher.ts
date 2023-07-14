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
    const newName = syncher();
    if (isInSynch && data.name !== newName) {
      update('name', newName);
      setInSynch(false);
    }
  }, [isInSynch, update, syncher, data.name]);

  useEffect(() => {
    setInSynch(data.name === syncher());
  }, [data.name, syncher]);
}
