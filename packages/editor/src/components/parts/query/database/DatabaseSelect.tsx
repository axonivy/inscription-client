import { useEditorContext, useMeta } from '../../../../context';
import { Select, SelectItem, useFieldset } from '../../../widgets';
import { PathFieldset } from '../../common';
import { useQueryData } from '../useQueryData';

export const DatabaseSelect = () => {
  const { config, update } = useQueryData();

  const { context } = useEditorContext();
  const databaseItems = useMeta('meta/database/names', context, []).data.map<SelectItem>(db => {
    return { label: db, value: db };
  });

  const fieldset = useFieldset();
  return (
    <PathFieldset label='Database' path='dbName' {...fieldset.labelProps}>
      <Select
        value={{ label: config.query.dbName, value: config.query.dbName }}
        onChange={item => update('dbName', item.value)}
        items={databaseItems}
        inputProps={fieldset.inputProps}
      />
    </PathFieldset>
  );
};
