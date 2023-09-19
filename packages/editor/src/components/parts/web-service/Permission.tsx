import { IVY_EXCEPTIONS } from '@axonivy/inscription-protocol';
import { useWebServiceData } from './useWebServiceData';
import { ExceptionSelect, PathCollapsible, PathFieldset } from '../common';
import RoleSelect from '../common/responsible/RoleSelect';
import { useFieldset } from '../../widgets';
import { deepEqual } from '../../../utils/equals';

export const Permission = () => {
  const { config, defaultConfig, updatePermission } = useWebServiceData();

  const roleFieldset = useFieldset();
  const errorFieldset = useFieldset();

  return (
    <PathCollapsible path='permission' label='Permission' defaultOpen={!deepEqual(config.permission, defaultConfig.permission)}>
      <PathFieldset label='Role' path='permission' {...roleFieldset.labelProps}>
        <RoleSelect
          value={config.permission.role}
          onChange={change => updatePermission('role', change)}
          inputProps={roleFieldset.inputProps}
        />
      </PathFieldset>
      <PathFieldset label='Violation error' path='error' {...errorFieldset.labelProps}>
        <ExceptionSelect
          value={config.permission.error}
          onChange={change => updatePermission('error', change)}
          staticExceptions={[IVY_EXCEPTIONS.security, IVY_EXCEPTIONS.ignoreException]}
          inputProps={errorFieldset.inputProps}
        />
      </PathFieldset>
    </PathCollapsible>
  );
};
