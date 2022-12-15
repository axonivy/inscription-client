import { TreeData } from '@axon-ivy/core/lib/inscription-model';
import { CellContext, RowData } from '@tanstack/react-table';
import React, { useEffect } from 'react';
import '../../../../style/EditableCell.css';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

export function editableCellMeta<TData>(data: TData[], setData: (newData: TData[]) => void) {
  return {
    updateData: (rowId: string, columnId: string, value: unknown) => {
      const rowIndex = rowId.split('.').map(parseFloat);
      setData(updateDataDeep(data, rowIndex, columnId, value));
    }
  };
}

function updateDataDeep<TData>(data: TData[], rows: number[], columnId: string, value: unknown): TData[] {
  const newData = data.map((row, index) => {
    const subRows = [...rows];
    const rowIndex = subRows.shift();
    if (index === rowIndex) {
      const rowData = data[rowIndex];
      if (subRows.length === 0) {
        return {
          ...rowData,
          [columnId]: value
        };
      } else if (TreeData.is<TData>(rowData)) {
        return {
          ...data[rowIndex]!,
          children: updateDataDeep(rowData.children, subRows, columnId, value)
        };
      }
    }
    return row;
  });
  return newData;
}

export function EditableCell<TData>(props: { cell: CellContext<TData, unknown> }) {
  const initialValue = props.cell.getValue();
  const [value, setValue] = React.useState(initialValue);
  const onBlur = () => {
    props.cell.table.options.meta?.updateData(props.cell.row.id, props.cell.column.id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return <input className='input' value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />;
}
