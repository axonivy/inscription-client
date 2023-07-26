import { InscriptionMetaRequestTypes } from '@axonivy/inscription-protocol';
import { useClient } from './useClient';
import { useEffect, useState } from 'react';

export function useMeta<TMeta extends keyof InscriptionMetaRequestTypes>(
  path: TMeta,
  args: InscriptionMetaRequestTypes[TMeta][0],
  initialData: InscriptionMetaRequestTypes[TMeta][1]
) {
  const [data, setData] = useState(initialData);
  const [fetch, setFetch] = useState(true);
  const client = useClient();

  useEffect(() => {
    if (fetch) {
      client.meta(path, args).then(setData);
      setFetch(false);
    }
  }, [args, client, fetch, path]);

  return { data, invalidate: () => setFetch(true) };
}
