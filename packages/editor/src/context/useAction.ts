import { InscriptionActionArgs } from '@axonivy/inscription-protocol';
import { useClient } from './useClient';
import { useEditorContext } from './useEditorContext';

export function useAction(actionId: InscriptionActionArgs["actionId"]) {
  const { pid } = useEditorContext();
  const client = useClient();

  return (payload?: InscriptionActionArgs["payload"]) => client.action({ actionId, pid, payload: payload ?? '' });
}
