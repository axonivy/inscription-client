import { deepEqual } from '../../../../../utils/equals.js';
import { useMeta } from '../../../../../context/index.js';
import { PathCollapsible } from '../../../common/index.js';
import { PropertyTable } from '../../../common/properties/PropertyTable.js';
import { useRestRequestData } from '../../useRestRequestData.js';

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
