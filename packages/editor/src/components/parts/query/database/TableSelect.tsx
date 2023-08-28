import { useEditorContext, useMeta } from '../../../../context';
import { Combobox, ComboboxItem } from '../../../widgets';
import { PathFieldset } from '../../common';
import { useQueryData } from '../useQueryData';

export const TableSelect = () => {
  const { config, updateSql } = useQueryData();

  const { context } = useEditorContext();
  const tableItems = useMeta('meta/database/tables', { context, database: config.query.dbName }, []).data.map<ComboboxItem>(table => {
    return { value: table };
  });

  return (
    <PathFieldset label='Table' path='table'>
      <Combobox
        value={config.query.sql.table}
        onChange={change => updateSql('table', change)}
        comboboxItem={item => <span>{item.value}</span>}
        items={tableItems}
      />
    </PathFieldset>
  );
};
