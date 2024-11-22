import type { InscriptionMetaRequestTypes } from '@axonivy/inscription-protocol';
import { useClient } from './useClient';
import { useQuery } from '@tanstack/react-query';

type NonUndefinedGuard<T> = T extends undefined ? never : T;

export function useMeta<TMeta extends keyof InscriptionMetaRequestTypes>(
  path: TMeta,
  args: InscriptionMetaRequestTypes[TMeta][0],
  initialData: NonUndefinedGuard<InscriptionMetaRequestTypes[TMeta][1]>,
  options?: { disable?: boolean }
) {
  const client = useClient();
  return useQuery({
    enabled: !options?.disable,
    queryKey: [path, args],
    queryFn: () => client.meta(path, args),
    initialData: initialData
  });
}
