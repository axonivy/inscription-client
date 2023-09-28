import { useWsRequestData } from './useWsRequestData';
import { useEditorContext, useMeta } from '../../../context';
import { PropertyTable } from '../common/properties/PropertyTable';
import { PathCollapsible } from '../common';
import { deepEqual } from '../../../utils/equals';

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
