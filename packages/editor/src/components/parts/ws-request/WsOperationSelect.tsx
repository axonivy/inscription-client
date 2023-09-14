import { PathContext, useEditorContext, useMeta } from '../../../context';
import { Select, SelectItem, useFieldset } from '../../widgets';
import { PathFieldset } from '../common';
import { useWsRequestData } from './useWsRequestData';

export const WsOperationSelect = () => {
  const { config, updateOperation } = useWsRequestData();

  const { context } = useEditorContext();
  const items = useMeta(
    'meta/webservice/operations',
    { clientId: config.clientId, port: config.operation.port, context },
    []
  ).data.map<SelectItem>(operation => {
    return { label: operation.name, value: operation.name };
  });
  const selectedItem = items.find(i => i.value === config.operation.name) ?? { label: config.operation.name, value: config.operation.name };

  const fieldset = useFieldset();
  return (
    <PathContext path='operation'>
      <PathFieldset label='Operation' path='name' {...fieldset.labelProps}>
        <Select
          value={selectedItem}
          onChange={item => updateOperation('name', item.value)}
          items={items}
          inputProps={fieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
