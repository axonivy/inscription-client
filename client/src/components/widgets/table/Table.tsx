import './Table.css';
import { flexRender, Header } from '@tanstack/react-table';

export const Table = (props: { children?: JSX.Element[] }) => (
  <div className='table-root'>
    <table className='table'>{props.children}</table>
  </div>
);

export const TableHeader = (props: { colSpan: number; children?: JSX.Element | string }) => (
  <th className='table-column-header' colSpan={props.colSpan}>
    {props.children}
  </th>
);

export function TableHeaderSorted<TData>(props: { header: Header<TData, unknown> }) {
  const header = props.header;
  return (
    <>
      {header.isPlaceholder ? undefined : (
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
    </>
  );
}

export const TableCell = (props: { children: JSX.Element | React.ReactNode }) => <td className='table-cell'>{props.children}</td>;
