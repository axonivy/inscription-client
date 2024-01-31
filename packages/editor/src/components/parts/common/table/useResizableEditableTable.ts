import type { ColumnDef, RowSelectionState, SortingState } from '@tanstack/react-table';
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import { useState, useEffect } from 'react';
import { deepEqual } from '../../../../utils/equals';

interface UseResizableEditableTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  onChange: (change: TData[]) => void;
  emptyDataObject: TData;
}

const useResizableEditableTable = <TData>({ data, columns, onChange, emptyDataObject }: UseResizableEditableTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateData: (rowId, columnId, value) => {
        const rowIndex = parseInt(rowId);
        const updatedData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...data[rowIndex]!,
              [columnId]: value
            };
          }
          return row;
        });
        if (!deepEqual(updatedData[updatedData.length - 1], emptyDataObject) && rowIndex === data.length - 1) {
          onChange([...updatedData, emptyDataObject]);
        } else {
          onChange(updatedData);
        }
      }
    }
  });

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      const filteredData = data.filter(obj => !deepEqual(obj, emptyDataObject));

      if (filteredData.length !== data.length) {
        setRowSelection({});
        onChange(filteredData);
      }
      return;
    }
  }, [data, emptyDataObject, onChange, rowSelection, table]);

  const showAddButton = () => {
    return data.filter(obj => deepEqual(obj, emptyDataObject)).length === 0;
  };

  const addRow = () => {
    const newData = [...data];
    newData.push(emptyDataObject);
    onChange(newData);
    setRowSelection({ [`${newData.length - 1}`]: true });
  };

  const removeRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    if (newData.length === 0) {
      setRowSelection({});
    } else if (index === data.length - 1) {
      setRowSelection({ [`${newData.length - 1}`]: true });
    }
    onChange(newData);
  };

  return { table, rowSelection, setRowSelection, addRow, removeRow, showAddButton };
};

export { useResizableEditableTable };
