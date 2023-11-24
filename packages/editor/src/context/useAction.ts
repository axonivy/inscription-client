import type { InscriptionActionArgs } from '@axonivy/inscription-protocol';
import { useClient } from './useClient.js';
import { useEditorContext } from './useEditorContext.js';

export function useAction(actionId: InscriptionActionArgs['actionId']) {
  const { elementContext: context } = useEditorContext();
  const client = useClient();

  return (content?: InscriptionActionArgs['payload']) => {
    let payload = content ?? '';
    if (typeof payload === 'object') {
      payload = JSON.stringify(payload);
    }
    client.action({ actionId, context, payload });
  };
}
