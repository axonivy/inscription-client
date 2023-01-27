import './EditableCell.css';
import { CellContext, RowData } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useReadonly } from '../../../../context';
import { CodeEditor } from '../../code-editor';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

export function CodeEditorCell<TData>(props: { cell: CellContext<TData, unknown>; type: string; location: string }) {
  const initialValue = props.cell.getValue();
  const [value, setValue] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);
  const onBlur = () => {
    setIsActive(false);
    props.cell.table.options.meta?.updateData(props.cell.row.id, props.cell.column.id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const readonly = useReadonly();

  return (
    <>
      {isActive ? (
        <div onBlur={onBlur}>
          <CodeEditor
            code={value as string}
            onChange={setValue}
            location={`${props.location}&type=${props.type}`}
            initFocus={true}
            singleLine={true}
          />
        </div>
      ) : (
        <input
          className='input'
          value={value as string}
          onChange={e => setValue(e.target.value)}
          onClick={() => setIsActive(true)}
          disabled={readonly || props.type.length === 0}
        />
      )}
    </>
  );
}
