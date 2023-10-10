import { useAction, useEditorContext, useMeta } from '../../../../../context';
import { FieldsetControl, Select, SelectItem, useFieldset } from '../../../../widgets';
import { PathFieldset } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';
import { IvyIcons } from '@axonivy/editor-icons';

export const RestClientSelect = () => {
  const { config, updateTarget } = useRestRequestData();

  const { context } = useEditorContext();
  const items = useMeta('meta/rest/clients', context, []).data.map<SelectItem>(client => ({ label: client.name, value: client.clientId }));
  const selectedItem = items.find(i => i.value === config.target.clientId) ?? {
    label: config.target.clientId,
    value: config.target.clientId
  };

  const newAction = useAction('newRestClient');
  const openAction = useAction('openConfig');
  const controls: FieldsetControl[] = [
    { label: 'Open Rest config', icon: IvyIcons.GoToSource, action: () => openAction() },
    { label: 'Create new Rest Client', icon: IvyIcons.Add, action: () => newAction() }
  ];

  const fieldset = useFieldset();
  return (
    <PathFieldset label='Client' path='clientId' {...fieldset.labelProps} controls={controls}>
      <div className='rest-client-select'>
        <Select
          value={selectedItem}
          onChange={item => updateTarget('clientId', item.value)}
          items={items}
          inputProps={fieldset.inputProps}
        />
      </div>
    </PathFieldset>
  );
};
