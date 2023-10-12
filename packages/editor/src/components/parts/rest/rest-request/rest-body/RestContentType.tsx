import { Combobox, ComboboxItem, useFieldset } from '../../../../../components/widgets';
import { PathFieldset } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';
import { useMeta } from '../../../../../context';

export const RestContentType = () => {
  const { config, updateBody } = useRestRequestData();
  const knownContentTypes = useMeta('meta/rest/contentTypes', { forBody: true }, []).data.map<ComboboxItem>(type => ({ value: type }));
  const fieldset = useFieldset();
  return (
    <PathFieldset label='Content-Type' path='mediaType' {...fieldset.labelProps}>
      <Combobox
        value={config.body.mediaType}
        onChange={change => updateBody('mediaType', change)}
        items={knownContentTypes}
        {...fieldset.inputProps}
      />
    </PathFieldset>
  );
};
