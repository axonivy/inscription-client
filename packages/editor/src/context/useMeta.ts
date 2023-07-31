import { InscriptionMetaRequestTypes } from '@axonivy/inscription-protocol';
import { useClient } from './useClient';
import { useQuery } from '@tanstack/react-query';

export function useMeta<TMeta extends keyof InscriptionMetaRequestTypes>(
  path: TMeta,
  args: InscriptionMetaRequestTypes[TMeta][0],
  initialData: InscriptionMetaRequestTypes[TMeta][1]
) {
  const client = useClient();

  return useQuery({
    queryKey: [path, args],
    queryFn: () => client.meta(path, args),
    initialData
  });
}
