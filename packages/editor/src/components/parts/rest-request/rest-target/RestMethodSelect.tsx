import { useMemo, useState } from 'react';
import { useEditorContext, useMeta } from '../../../../context';
import { Combobox, ComboboxItem, FieldsetControl, IvyIcon, ScriptInput, Select, SelectItem, useFieldset } from '../../../widgets';
import { PathFieldset } from '../../common';
import { useRestRequestData } from '../useRestRequestData';
import { IvyIcons } from '@axonivy/editor-icons';
import { HttpMethod, IVY_SCRIPT_TYPES, HTTP_METHOD, RestResourceMeta } from '@axonivy/inscription-protocol';
import './RestMethodSelect.css';

type RestMethodItem = ComboboxItem & RestResourceMeta;

export const RestMethodSelect = () => {
  const { config, update, updateMethod, updateTarget } = useRestRequestData();
  const [openApi, setOpenApi] = useState(true);
  const openApiControl: FieldsetControl = {
    label: 'Toggle OpenApi',
    icon: IvyIcons.RestClient,
    action: () => setOpenApi(value => !value),
    active: openApi
  };

  const { context } = useEditorContext();
  const items = useMeta('meta/rest/resources', { context, clientId: config.target.clientId }, []).data.map<RestMethodItem>(res => {
    return { ...res, value: `${res.method}:${res.path}` };
  });
  const methodItems = useMemo<SelectItem[]>(() => Object.entries(HTTP_METHOD).map(([value, label]) => ({ label, value })), []);

  const comboboxItem = (item: RestMethodItem) => {
    return (
      <>
        <div>
          <IvyIcon icon={IvyIcons.RestClient} />
          {item.path} - {item.method}
        </div>
        {item.description && item.description.length > 0 && (
          <div>
            <span className='combobox-menu-entry-additional'>{item.description}</span>
          </div>
        )}
      </>
    );
  };

  const fieldset = useFieldset();
  return (
    <PathFieldset label='Resource' path='path' {...fieldset.labelProps} controls={items.length > 0 ? [openApiControl] : []}>
      {items.length > 0 && openApi ? (
        <Combobox
          value={`${config.method}:${config.target.path}`}
          onChange={value => updateMethod(value)}
          items={items}
          comboboxItem={comboboxItem}
          {...fieldset.inputProps}
        />
      ) : (
        <div className='rest-method-input'>
          <Select
            value={{ label: config.method, value: config.method }}
            onChange={item => update('method', item.value as HttpMethod)}
            items={methodItems}
          />
          <ScriptInput
            value={config.target.path}
            onChange={change => updateTarget('path', change)}
            type={IVY_SCRIPT_TYPES.STRING}
            {...fieldset.inputProps}
          />
        </div>
      )}
    </PathFieldset>
  );
};
