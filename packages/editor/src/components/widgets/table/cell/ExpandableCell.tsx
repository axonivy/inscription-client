import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../../button/Button';
import './ExpandableCell.css';
import { CellContext } from '@tanstack/react-table';

type ExpandableCellProps<TData> = {
  cell: CellContext<TData, unknown>;
  isLoaded?: boolean;
  loadChildren?: () => void;
  isUnknown?: boolean;
  title?: string;
};

export function ExpandableCell<TData>({ cell, isLoaded, loadChildren, isUnknown, title }: ExpandableCellProps<TData>) {
  const row = cell.row;
  const onClick = () => {
    if (isLoaded === false && loadChildren) {
      loadChildren();
    }
    row.toggleExpanded(true);
  };
  return (
    <div className='row-expand' style={{ paddingLeft: `${row.depth}rem` }} title={title}>
      {row.getCanExpand() ? (
        <Button
          icon={IvyIcons.AngleDown}
          className='row-expand-button'
          aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
          data-state={row.getIsExpanded() ? 'expanded' : 'collapsed'}
          {...{ onClick: row.getToggleExpandedHandler() }}
        />
      ) : isLoaded === false ? (
        <Button icon={IvyIcons.AngleDown} className='row-expand-button' aria-label='Expand row' onClick={onClick} data-state='collapsed' />
      ) : isUnknown === true ? (
        '⛔'
      ) : (
        '🔵'
      )}{' '}
      <span className='row-expand-label'>{cell.getValue() as string}</span>
    </div>
  );
}
