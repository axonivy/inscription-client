import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../../button/Button';
import './ExpandableCell.css';
import { CellContext } from '@tanstack/react-table';
import IvyIcon from '../../IvyIcon';

type ExpandableCellProps<TData> = {
  cell: CellContext<TData, unknown>;
  isLoaded?: boolean;
  loadChildren?: () => void;
  isUnknown?: boolean;
  icon?: IvyIcons;
  title?: string;
};

export function ExpandableCell<TData>({ cell, isLoaded, loadChildren, isUnknown, icon, title }: ExpandableCellProps<TData>) {
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
        <>
          <Button
            icon={IvyIcons.AngleDown}
            className='row-expand-button'
            aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
            data-state={row.getIsExpanded() ? 'expanded' : 'collapsed'}
            {...{ onClick: row.getToggleExpandedHandler() }}
          />
          {icon && <IvyIcon icon={icon} />}
        </>
      ) : isLoaded === false ? (
        <Button icon={IvyIcons.AngleDown} className='row-expand-button' aria-label='Expand row' onClick={onClick} data-state='collapsed' />
      ) : isUnknown === true ? (
        '⛔'
      ) : (
        <>
          🔵
          {icon && <IvyIcon icon={icon} />}
        </>
      )}{' '}
      <span className='row-expand-label'>{cell.getValue() as string}</span>
    </div>
  );
}
