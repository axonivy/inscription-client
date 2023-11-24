import { useMeta, useEditorContext } from '../../../../context/index.js';
import type { SelectItem } from '../../../widgets/index.js';
import { Select, useFieldset } from '../../../widgets/index.js';
import { PathFieldset } from '../../common/index.js';
import { useQueryData } from '../useQueryData.js';

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
