import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useRequestData } from './useRequestData';
import { IVY_EXCEPTIONS, RequestData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import { Checkbox, MacroArea, MacroInput, useFieldset } from '../../../components/widgets';
import { ExceptionSelect, IGNROE_EXCEPTION, PathCollapsible, PathFieldset } from '../common';
import StartCustomFieldPart from '../common/customfield/StartCustomFieldPart';
import RoleSelect from '../common/responsible/RoleSelect';
import { deepEqual } from '../../../utils/equals';

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

  const nameFieldset = useFieldset();
  const descFieldset = useFieldset();
  const categoryFieldset = useFieldset();
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
            <PathFieldset label='Name' path='name' {...nameFieldset.labelProps}>
              <MacroInput value={config.request.name} onChange={change => updateRequest('name', change)} {...nameFieldset.inputProps} />
            </PathFieldset>
            <PathFieldset label='Description' path='description' {...descFieldset.labelProps}>
              <MacroArea
                value={config.request.description}
                onChange={change => updateRequest('description', change)}
                {...descFieldset.inputProps}
              />
            </PathFieldset>
            <PathFieldset label='Category' path='category' {...categoryFieldset.labelProps}>
              <MacroInput
                value={config.request.category}
                onChange={change => updateRequest('category', change)}
                {...categoryFieldset.inputProps}
              />
            </PathFieldset>
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
            <PathFieldset label='Validation error' path='error' {...errorFieldset.labelProps}>
              <ExceptionSelect
                value={config.permission.error}
                onChange={change => updatePermission('error', change)}
                staticExceptions={[IVY_EXCEPTIONS.security, IGNROE_EXCEPTION]}
                inputProps={errorFieldset.inputProps}
              />
            </PathFieldset>
          </PathCollapsible>
        </>
      )}
    </>
  );
};
