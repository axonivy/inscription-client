import { useMemo } from 'react';
import { useEditorContext, useMeta, useOpenApi } from '../../../../../context';
import type { ComboboxItem, SelectItem } from '../../../../widgets';
import { Combobox, ScriptInput, Select } from '../../../../widgets';
import { PathFieldset } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';
import type { HttpMethod, RestResource } from '@axonivy/inscription-protocol';
import { IVY_SCRIPT_TYPES, HTTP_METHOD } from '@axonivy/inscription-protocol';
import './RestMethodSelect.css';
import { useUpdateRestResource } from '../../useUpdateRestResource';
import { Field, Flex } from '@axonivy/ui-components';

type RestMethodItem = ComboboxItem & RestResource;

export const RestMethodSelect = () => {
  const { config, update, updateTarget } = useRestRequestData();
  const { updateResource } = useUpdateRestResource();

  const { context } = useEditorContext();
  const items = useMeta('meta/rest/resources', { context, clientId: config.target.clientId }, []).data.map<RestMethodItem>(res => {
    return { ...res, value: `${res.method.httpMethod}:${res.path}` };
  });
  const methodItems = useMemo<SelectItem[]>(() => Object.entries(HTTP_METHOD).map(([value, label]) => ({ label, value })), []);

  const comboboxItem = (item: RestMethodItem) => {
    return (
      <>
        <div>
          <span className='combobox-method'>{item.method.httpMethod}</span>
          {item.path}
        </div>
        {item.doc && item.doc.length > 0 && (
          <div>
            <span className='combobox-menu-entry-additional'>{item.doc}</span>
          </div>
        )}
      </>
    );
  };

  const { openApi } = useOpenApi();
  return (
    <PathFieldset label='Resource' path='path'>
      {items.length > 0 && openApi ? (
        <Combobox
          value={`${config.method}:${config.target.path}`}
          onChange={value =>
            updateResource(
              value,
              items.find(i => i.value === value)
            )
          }
          items={items}
          comboboxItem={comboboxItem}
        />
      ) : (
        <Flex direction='row' gap={2} className='rest-method-input'>
          <Select
            value={{ label: config.method, value: config.method }}
            onChange={item => update('method', item.value as HttpMethod)}
            items={methodItems}
          />
          <Field>
            <ScriptInput
              value={config.target.path}
              onChange={change => updateTarget('path', change)}
              type={IVY_SCRIPT_TYPES.STRING}
              modifyAction={value => `{${value}}`}
              browsers={['attr']}
            />
          </Field>
        </Flex>
      )}
    </PathFieldset>
  );
};
