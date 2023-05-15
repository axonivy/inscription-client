import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../../button/Button';
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
    <div className='row-expand' style={{ paddingLeft: `${row.depth}rem` }}>
      {row.getCanExpand() ? (
        <Button
          icon={IvyIcons.AngleDown}
          className='row-expand-button'
          aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
          data-state={row.getIsExpanded() ? 'expanded' : 'collapsed'}
          {...{ onClick: row.getToggleExpandedHandler() }}
        />
      ) : props.isLoaded === false ? (
        <Button icon={IvyIcons.AngleDown} className='row-expand-button' aria-label='Expand row' onClick={onClick} data-state='collapsed' />
      ) : props.isUnknown === true ? (
        '⛔'
      ) : (
        '🔵'
      )}{' '}
      <span className='row-expand-label'>{props.cell.getValue() as string}</span>
    </div>
  );
}
