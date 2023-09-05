import { PathContext, useEditorContext, useMeta } from '../../../../context';
import { Combobox, ComboboxItem, useFieldset } from '../../../widgets';
import { PathFieldset } from '../../common';
import { useQueryData } from '../useQueryData';

export const TableSelect = () => {
  const { config, updateSql } = useQueryData();

  const { context } = useEditorContext();
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
          comboboxItem={item => <span>{item.value}</span>}
          items={tableItems}
          {...fieldset.inputProps}
        />
      </PathFieldset>
    </PathContext>
  );
};
