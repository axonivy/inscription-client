import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../../button/Button.js';
import './ExpandableCell.js';
import type { CellContext } from '@tanstack/react-table';
import IvyIcon from '../../IvyIcon.js';

type ExpandableCellProps<TData> = {
  cell: CellContext<TData, unknown>;
  isLoaded?: boolean;
  loadChildren?: () => void;
  isUnknown?: boolean;
  icon?: IvyIcons;
  title?: string;
  additionalInfo?: string;
};

export function ExpandableCell<TData>({
  cell,
  isLoaded,
  loadChildren,
  isUnknown,
  icon,
  title,
  additionalInfo
}: ExpandableCellProps<TData>) {
  const row = cell.row;
  const onClick = () => {
    if (isLoaded === false && loadChildren) {
      loadChildren();
    }
    row.toggleExpanded(true);
  };
  return (
    <div className='row-expand' style={{ paddingLeft: `calc(${row.depth}*(var(--tree-gap))` }} title={title}>
      {row.getCanExpand() ? (
        <>
          <Button
            icon={IvyIcons.Chevron}
            className='row-expand-button'
            aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
            data-state={row.getIsExpanded() ? 'expanded' : 'collapsed'}
            {...{ onClick: row.getToggleExpandedHandler() }}
          />
          {icon && <IvyIcon icon={icon} />}
        </>
      ) : isLoaded === false ? (
        <Button icon={IvyIcons.Chevron} className='row-expand-button' aria-label='Expand row' onClick={onClick} data-state='collapsed' />
      ) : isUnknown === true ? (
        '⛔'
      ) : (
        <>{icon && <IvyIcon icon={icon} />}</>
      )}
      <span className={additionalInfo ? 'row-expand-label' : ''}>{cell.getValue() as string}</span>
      {additionalInfo && <span className='row-expand-label-info'> : {additionalInfo}</span>}
    </div>
  );
}
