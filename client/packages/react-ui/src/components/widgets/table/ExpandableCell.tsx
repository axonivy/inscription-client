import { CellContext, HeaderContext } from '@tanstack/react-table';
import '../../../../style/ExpandableCell.css';

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

export function ExpandableCell<TData>(props: { cell: CellContext<TData, unknown> }) {
  const row = props.cell.row;
  return (
    <div style={{ paddingLeft: `${row.depth}rem` }}>
      {row.getCanExpand() ? (
        <button
          className='row-expand-button'
          aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
          {...{ onClick: row.getToggleExpandedHandler() }}
        >
          {row.getIsExpanded() ? '🔽' : '▶️'}
        </button>
      ) : (
        '🔵'
      )}{' '}
      <span>{props.cell.getValue() as string}</span>
    </div>
  );
}
