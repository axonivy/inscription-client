import type { ConfigDataContext} from '../../../context/index.js';
import { useConfigDataContext } from '../../../context/index.js';
import type { PermissionsData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda.js';

export function usePermissionsData(): ConfigDataContext<PermissionsData> & {
  update: DataUpdater<PermissionsData['permissions']['view']>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<PermissionsData['permissions']['view']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.permissions.view[field] = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.permissions = config.initConfig.permissions;
      })
    );

  return {
    ...config,
    update,
    reset
  };
}
