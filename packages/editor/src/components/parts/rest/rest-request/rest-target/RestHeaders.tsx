import type { ComboboxItem} from '../../../../widgets';
import { Combobox, Fieldset, useFieldset } from '../../../../widgets';
import { useMeta } from '../../../../../context';
import { PathCollapsible } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';
import { deepEqual } from '../../../../../utils/equals';
import { PropertyTable } from '../../../common/properties/PropertyTable';
import { useRestResourceMeta } from '../../useRestResourceMeta';

export const RestHeaders = () => {
  const { config, defaultConfig, updateTarget, updateAcceptHeader } = useRestRequestData();

  const knownContentTypes = useMeta('meta/rest/contentTypes', { forBody: false }, []).data.map<ComboboxItem>(type => ({ value: type }));
  const knownHeaders = useMeta('meta/rest/headers', undefined, []).data;
  const restResourceHeaders = useRestResourceMeta().headers?.map(header => header.name) ?? [];

  const acceptFieldset = useFieldset();
  return (
    <PathCollapsible label='Headers' path='headers' defaultOpen={!deepEqual(config.target.headers, defaultConfig.target.headers)}>
      <Fieldset label='Accept' {...acceptFieldset.labelProps}>
        <Combobox
          value={config.target.headers['Accept']}
          onChange={updateAcceptHeader}
          items={knownContentTypes}
          {...acceptFieldset.inputProps}
        />
      </Fieldset>
      <PropertyTable
        properties={config.target.headers}
        update={change => updateTarget('headers', change)}
        knownProperties={[...restResourceHeaders, ...knownHeaders]}
        hideProperties={['Accept']}
      />
    </PathCollapsible>
  );
};
