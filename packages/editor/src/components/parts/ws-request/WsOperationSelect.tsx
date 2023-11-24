import { IvyIcons } from '@axonivy/editor-icons';
import { useMeta, PathContext, useAction, useEditorContext } from '../../../context/index.js';
import type { FieldsetControl, SelectItem } from '../../widgets/index.js';
import { Select, useFieldset } from '../../widgets/index.js';
import { PathFieldset } from '../common/index.js';
import { useWsRequestData } from './useWsRequestData.js';

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

  const action = useAction('openTestWs');
  const testWs: FieldsetControl = { label: 'Test WebService config', icon: IvyIcons.Play, action: () => action() };
  const fieldset = useFieldset();
  return (
    <PathContext path='operation'>
      <PathFieldset label='Operation' path='name' {...fieldset.labelProps} controls={[testWs]}>
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
