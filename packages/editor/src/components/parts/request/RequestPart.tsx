import type { PartProps} from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useRequestData } from './useRequestData';
import type { RequestData } from '@axonivy/inscription-protocol';
import { IVY_EXCEPTIONS } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import { Checkbox, useFieldset } from '../../../components/widgets';
import { ExceptionSelect, PathCollapsible, PathFieldset } from '../common';
import StartCustomFieldPart from '../common/customfield/StartCustomFieldPart';
import RoleSelect from '../common/responsible/RoleSelect';
import { deepEqual } from '../../../utils/equals';
import Information from '../common/info/Information';

export function useRequestPart(): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useRequestData();
  const requestVal = useValidations(['request']);
  const permissionVal = useValidations(['permission']);
  const compareData = (data: RequestData) => [data];
  const state = usePartState(compareData(defaultConfig), compareData(config), [...requestVal, ...permissionVal]);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Request', state: state, reset: { dirty, action: () => resetData() }, content: <RequestPart /> };
}

const RequestPart = () => {
  const { config, defaultConfig, updateRequest, updatePermission } = useRequestData();
  const roleFieldset = useFieldset();
  const errorFieldset = useFieldset();
  return (
    <>
      <Checkbox
        value={config.request.isHttpRequestable}
        onChange={change => updateRequest('isHttpRequestable', change)}
        label='Yes, this can be started with a HTTP-Request / -Link'
      />
      {config.request.isHttpRequestable && (
        <>
          <PathContext path='request'>
            {config.request.linkName}
            <Checkbox
              value={config.request.isVisibleOnStartList}
              onChange={change => updateRequest('isVisibleOnStartList', change)}
              label='Start list'
            />
            <Information config={config.request} update={updateRequest} />
            <StartCustomFieldPart
              customFields={config.request.customFields}
              updateCustomFields={change => updateRequest('customFields', change)}
            />
          </PathContext>
          <PathCollapsible label='Permission' path='permission' defaultOpen={!deepEqual(config.permission, defaultConfig.permission)}>
            <Checkbox value={config.permission.anonymous} onChange={change => updatePermission('anonymous', change)} label='Anonymous' />
            {!config.permission.anonymous && (
              <PathFieldset label='Role' path='role' {...roleFieldset.labelProps}>
                <RoleSelect
                  value={config.permission.role}
                  onChange={change => updatePermission('role', change)}
                  inputProps={roleFieldset.inputProps}
                />
              </PathFieldset>
            )}
            <PathFieldset label='Violation error' path='error' {...errorFieldset.labelProps}>
              <ExceptionSelect
                value={config.permission.error}
                onChange={change => updatePermission('error', change)}
                staticExceptions={[IVY_EXCEPTIONS.security, IVY_EXCEPTIONS.ignoreException]}
                inputProps={errorFieldset.inputProps}
              />
            </PathFieldset>
          </PathCollapsible>
        </>
      )}
    </>
  );
};
