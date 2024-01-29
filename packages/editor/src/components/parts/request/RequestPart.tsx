import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useRequestData } from './useRequestData';
import type { RequestData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import { Checkbox } from '../../../components/widgets';
import Information from '../common/info/Information';
import { Permission } from '../common/permission/Permission';
import StartCustomFieldTable from '../common/customfield/StartCustomFieldTable';

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

            <StartCustomFieldTable data={config.request.customFields} onChange={change => updateRequest('customFields', change)} />
          </PathContext>
          <Permission
            config={config.permission}
            defaultConfig={defaultConfig.permission}
            updatePermission={updatePermission}
            anonymousFieldActive={true}
          />
        </>
      )}
    </>
  );
};
