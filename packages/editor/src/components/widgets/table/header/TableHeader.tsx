import './TableHeader.css';
import { flexRender, Header, HeaderContext } from '@tanstack/react-table';
import { ReactNode } from 'react';

export const TableHeader = (props: { colSpan: number; children?: ReactNode }) => (
  <th className='table-column-header' colSpan={props.colSpan}>
    {props.children}
  </th>
);

export function TableHeaderSorted<TData>(props: { header: Header<TData, unknown> }) {
  const header = props.header;
  return (
    <>
      {header.isPlaceholder ? undefined : (
        <button
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
        </button>
      )}
    </>
  );
}

export function ExpandableHeader<TData>(props: { header: HeaderContext<TData, unknown>; name: string }) {
  const table = props.header.table;
  return (
    <>
      <button
        className='column-expand-button'
        aria-label={table.getIsAllRowsExpanded() ? 'Collapse tree' : 'Expand tree'}
        {...{ onClick: table.getToggleAllRowsExpandedHandler() }}
      >
        {table.getIsAllRowsExpanded() ? '🔽' : '▶️'}
      </button>{' '}
      <span>{props.name}</span>
    </>
  );
}
