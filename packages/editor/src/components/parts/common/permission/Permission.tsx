import type { StartPermission } from '@axonivy/inscription-protocol';
import { IVY_EXCEPTIONS } from '@axonivy/inscription-protocol';
import RoleSelect from '../responsible/RoleSelect';
import { Checkbox, useFieldset } from '../../../widgets';
import { deepEqual } from '../../../../utils/equals';
import { PathFieldset } from '../path/PathFieldset';
import { PathCollapsible } from '../path/PathCollapsible';
import ExceptionSelect from '../exception-handler/ExceptionSelect';
import type { DataUpdater } from '../../../../types/lambda';

interface PermissionProps {
  anonymousFieldActive: boolean;
  config: StartPermission;
  defaultConfig: StartPermission;
  updatePermission: DataUpdater<StartPermission>;
}

export const Permission = ({ anonymousFieldActive, config, defaultConfig, updatePermission }: PermissionProps) => {
  const roleFieldset = useFieldset();
  const errorFieldset = useFieldset();

  return (
    <PathCollapsible path='permission' label='Permission' defaultOpen={!deepEqual(config, defaultConfig)}>
      {anonymousFieldActive && (
        <Checkbox label='Allow anonymous' value={config.anonymous} onChange={change => updatePermission('anonymous', change)} />
      )}
      {(!anonymousFieldActive || (anonymousFieldActive && !config.anonymous)) && (
        <PathFieldset label='Role' path='role' {...roleFieldset.labelProps}>
          <RoleSelect value={config.role} onChange={change => updatePermission('role', change)} inputProps={roleFieldset.inputProps} />
        </PathFieldset>
      )}
      <PathFieldset label='Violation error' path='error' {...errorFieldset.labelProps}>
        <ExceptionSelect
          value={config.error}
          onChange={change => updatePermission('error', change)}
          staticExceptions={[IVY_EXCEPTIONS.security, IVY_EXCEPTIONS.ignoreException]}
          inputProps={errorFieldset.inputProps}
        />
      </PathFieldset>
    </PathCollapsible>
  );
};
