import { deepEqual } from '../../../../utils/equals';
import { useMeta } from '../../../../context';
import { PathCollapsible } from '../../common';
import { PropertyTable } from '../../common/properties/PropertyTable';
import { useRestRequestData } from '../useRestRequestData';

export const RestProperties = () => {
  const { config, defaultConfig, updateTarget } = useRestRequestData();

  const knownProperties = useMeta('meta/rest/properties', undefined, []).data;

  return (
    <PathCollapsible
      label='Properties'
      path='properties'
      defaultOpen={!deepEqual(config.target.properties, defaultConfig.target.properties)}
    >
      <PropertyTable
        properties={config.target.properties}
        update={change => updateTarget('properties', change)}
        knownProperties={knownProperties}
      />
    </PathCollapsible>
  );
};
