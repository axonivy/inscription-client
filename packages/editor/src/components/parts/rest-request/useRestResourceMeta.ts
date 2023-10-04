import { RestResource } from '@axonivy/inscription-protocol';
import { useEditorContext, useMeta } from '../../../context';
import { useRestRequestData } from './useRestRequestData';

export const useRestResourceMeta = () => {
  const { config } = useRestRequestData();
  const { context } = useEditorContext();
  return useMeta(
    'meta/rest/resource',
    { context, clientId: config.target.clientId, method: config.method, path: config.target.path },
    {} as RestResource
  ).data;
};
