import './ExpandableCell.css';
import { CellContext, HeaderContext } from '@tanstack/react-table';

export function ExpandableHeader<TData>(props: { header: HeaderContext<TData, unknown>; name: string }) {
  const table = props.header.table;
  return (
    <>
      <button className='column-expand-button' {...{ onClick: table.getToggleAllRowsExpandedHandler() }}>
        {table.getIsAllRowsExpanded() ? '🔽' : '▶️'}
      </button>{' '}
      <span>{props.name}</span>
    </>
  );
}

export function ExpandableCell<TData>(props: { cell: CellContext<TData, unknown> }) {
  const row = props.cell.row;
  return (
    <div style={{ paddingLeft: `${row.depth}rem` }}>
      {row.getCanExpand() ? (
        <button className='row-expand-button' {...{ onClick: row.getToggleExpandedHandler(), style: { cursor: 'pointer' } }}>
          {row.getIsExpanded() ? '🔽' : '▶️'}
        </button>
      ) : (
        '🔵'
      )}{' '}
      <span>{props.cell.getValue() as string}</span>
    </div>
  );
}
