import { useMeta, PathContext, useEditorContext } from '../../../../context/index.js';
import type { ComboboxItem } from '../../../widgets/index.js';
import { Combobox, useFieldset } from '../../../widgets/index.js';
import { PathFieldset } from '../../common/index.js';
import { useQueryData } from '../useQueryData.js';

export const TableSelect = () => {
  const { config, updateSql } = useQueryData();

  const { elementContext: context } = useEditorContext();
  const tableItems = useMeta('meta/database/tables', { context, database: config.query.dbName }, []).data.map<ComboboxItem>(table => {
    return { value: table };
  });

  const fieldset = useFieldset();
  return (
    <PathContext path='sql'>
      <PathFieldset label='Table' path='table' {...fieldset.labelProps}>
        <Combobox
          value={config.query.sql.table}
          onChange={change => updateSql('table', change)}
          items={tableItems}
          {...fieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
