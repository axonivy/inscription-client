import { useWsRequestData } from './useWsRequestData.js';
import { useMeta, useEditorContext } from '../../../context/index.js';
import { PropertyTable } from '../common/properties/PropertyTable.js';
import { PathCollapsible } from '../common/index.js';
import { deepEqual } from '../../../utils/equals.js';

export const WsProperties = () => {
  const { config, defaultConfig, update } = useWsRequestData();

  const { context } = useEditorContext();
  const knownProperties = useMeta('meta/webservice/properties', { clientId: config.clientId, context }, []).data;

  return (
    <PathCollapsible label='Properties' path='properties' defaultOpen={!deepEqual(config.properties, defaultConfig.properties)}>
      <PropertyTable properties={config.properties} update={change => update('properties', change)} knownProperties={knownProperties} />
    </PathCollapsible>
  );
};
