import type { InscriptionMetaRequestTypes } from '@axonivy/inscription-protocol';
import { useClient } from './useClient.js';
import { useQuery, type DefinedUseQueryResult } from '@tanstack/react-query';

type NonUndefinedGuard<T> = T extends undefined ? never : T;

export function useMeta<TMeta extends keyof InscriptionMetaRequestTypes>(
  path: TMeta,
  args: InscriptionMetaRequestTypes[TMeta][0],
  initialData: NonUndefinedGuard<InscriptionMetaRequestTypes[TMeta][1]>
): DefinedUseQueryResult<InscriptionMetaRequestTypes[TMeta][1], Error> {
  const client = useClient();
  return useQuery({
    queryKey: [path, args],
    queryFn: () => client.meta(path, args),
    initialData: initialData
  });
}
