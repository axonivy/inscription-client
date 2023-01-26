import './ExpandableCell.css';
import { CellContext } from '@tanstack/react-table';

export function ExpandableCell<TData>(props: {
  cell: CellContext<TData, unknown>;
  isLoaded?: boolean;
  loadChildren?: () => void;
  isUnknown?: boolean;
}) {
  const row = props.cell.row;
  const onClick = () => {
    if (props.isLoaded === false && props.loadChildren) {
      props.loadChildren();
    }
    row.toggleExpanded(true);
  };
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
      ) : props.isLoaded === false ? (
        <button className='row-expand-button' aria-label='Expand row' onClick={onClick}>
          ▶️
        </button>
      ) : props.isUnknown === true ? (
        '⛔'
      ) : (
        '🔵'
      )}{' '}
      <span>{props.cell.getValue() as string}</span>
    </div>
  );
}
