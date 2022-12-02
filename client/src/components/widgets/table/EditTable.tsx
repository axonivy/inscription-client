import React from 'react';

import './EditTable.css';

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
  SortingState,
  getSortedRowModel,
  CellContext
} from '@tanstack/react-table';
import { Doc } from '../../../data/document';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const EditableCell = (props: { cell: CellContext<Doc, unknown> }) => {
  const initialValue = props.cell.getValue();
  const [value, setValue] = React.useState(initialValue);
  const onBlur = () => {
    props.cell.table.options.meta?.updateData(props.cell.row.index, props.cell.column.id, value);
  };
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return <input className='input' value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />;
};

const EditTable = (props: { data: Doc[]; onChange: (change: Doc[]) => void }) => {
  const columns = React.useMemo<ColumnDef<Doc>[]>(
    () => [
      {
        accessorKey: 'description',
        header: () => <span>Description</span>,
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id
      },
      {
        accessorFn: row => row.url,
        id: 'url',
        header: () => <span>URL</span>,
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id
      }
    ],
    []
  );

  const [data, setData] = React.useState(() => props.data);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const addRow = () =>
    setData(() => {
      const newData = [...data];
      newData.push({ description: '', url: '' });
      props.onChange(newData);
      return newData;
    });

  const removeTableRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    props.onChange(newData);
    setData(newData);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        const newData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...data[rowIndex]!,
              [columnId]: value
            };
          }
          return row;
        });
        setData(newData);
        props.onChange(newData);
      }
    }
  });

  return (
    <div className='edit-table'>
      <table className='table'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th className='table-column-header' key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'sortable-column' : '',
                          onClick: header.column.getToggleSortingHandler()
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽'
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
              <th className='table-column-header' key={`${headerGroup.id}-actions`} colSpan={2}>
                Actions
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td className='table-cell' key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
                <td className='table-cell' key={`${row.id}-actions`}>
                  <span className='action-buttons'>
                    <button onClick={() => removeTableRow(row.index)}>🗑️</button>
                    <button>🔍</button>
                    <button>➡️</button>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} className='add-row'>
              <button onClick={addRow}>
                <span className='add-row-plus'>+</span>
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EditTable;
