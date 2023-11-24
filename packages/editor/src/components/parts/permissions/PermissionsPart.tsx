import type { PartProps} from '../../../components/editors/index.js';
import { usePartDirty, usePartState } from '../../../components/editors/index.js';
import { Checkbox } from '../../../components/widgets/index.js';
import { usePermissionsData } from './usePermissionsData.js';
import type { PermissionsData } from '@axonivy/inscription-protocol';

export function usePermissionsPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = usePermissionsData();
  const compareData = (data: PermissionsData) => [data.permissions];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Permissions', state, reset: { dirty, action: () => reset() }, content: <PermissionsPart /> };
}

const PermissionsPart = () => {
  const { config, update } = usePermissionsData();

  return (
    <Checkbox
      label='Allow all workflow users to view the process on the Engine'
      value={config.permissions.view.allowed}
      onChange={change => update('allowed', change)}
    />
  );
};
