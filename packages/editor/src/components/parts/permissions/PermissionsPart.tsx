import { PartProps, usePartDirty, usePartState } from '../../../components/editors';
import { useValidations } from '../../../context';
import { Checkbox } from '../../../components/widgets';
import { usePermissionsData } from './usePermissionsData';
import { PermissionsData } from '@axonivy/inscription-protocol';

export function usePermissionsPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = usePermissionsData();
  const compareData = (data: PermissionsData) => [data];
  const validation = useValidations([]);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
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
