import { InscriptionActionHandlers } from '@axonivy/inscription-protocol';
import { useClient } from './useClient';
import { useEditorContext } from './useEditorContext';

export function useAction<TKind extends keyof InscriptionActionHandlers>(kind: TKind) {
  const { pid } = useEditorContext();
  const client = useClient();

  return (payload?: InscriptionActionHandlers[TKind]) => client.action({ kind, pid, payload: payload ?? '' });
}
