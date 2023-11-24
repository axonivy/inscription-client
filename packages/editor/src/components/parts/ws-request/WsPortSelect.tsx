import { useMeta, PathContext, useEditorContext } from '../../../context/index.js';
import type { SelectItem } from '../../widgets/index.js';
import { Select, useFieldset } from '../../widgets/index.js';
import { PathFieldset } from '../common/index.js';
import { useWsRequestData } from './useWsRequestData.js';

export const WsPortSelect = () => {
  const { config, updateOperation } = useWsRequestData();

  const { context } = useEditorContext();
  const items = useMeta('meta/webservice/ports', { clientId: config.clientId, context }, []).data.map<SelectItem>(port => {
    return { label: port, value: port };
  });
  const selectedItem = items.find(i => i.value === config.operation.port) ?? { label: config.operation.port, value: config.operation.port };

  const fieldset = useFieldset();
  return (
    <PathContext path='operation'>
      <PathFieldset label='Port' path='port' {...fieldset.labelProps}>
        <Select
          value={selectedItem}
          onChange={item => updateOperation('port', item.value)}
          items={items}
          inputProps={fieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
