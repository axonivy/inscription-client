import './TableHeader.css';
import type { HeaderContext } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import Button from '../../button/Button';
import { IvyIcons } from '@axonivy/editor-icons';

export const TableHeader = (props: { colSpan: number; children?: ReactNode; columnWidth?: number }) => (
  <th className='table-column-header' colSpan={props.colSpan} style={props.columnWidth ? { width: `${props.columnWidth}px` } : {}}>
    {props.children}
  </th>
);

export function SortableHeader<TData>(props: { header: HeaderContext<TData, unknown>; name: string; seperator?: boolean }) {
  const header = props.header;
  return (
    <>
      {props.seperator && (
        <div
          {...{
            onMouseDown: header.header.getResizeHandler(),
            onTouchStart: header.header.getResizeHandler(),
            className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`
          }}
        />
      )}
      <div className='column-sort'>
        <span className='column-sort-label'>{props.name}</span>
        <Button
          className={header.column.getCanSort() ? 'column-sort-button' : ''}
          aria-label={`Sort by ${props.name}`}
          onClick={header.column.getToggleSortingHandler()}
          data-state={header.column.getIsSorted() || 'unsorted'}
          icon={header.column.getIsSorted() ? IvyIcons.Chevron : IvyIcons.Straighten}
        />
      </div>
    </>
  );
}

export function ExpandableHeader<TData>(props: { header: HeaderContext<TData, unknown>; name: string }) {
  const table = props.header.table;
  return (
    <div className='column-expand'>
      <Button
        icon={IvyIcons.Chevron}
        className='column-expand-button'
        aria-label={table.getIsAllRowsExpanded() ? 'Collapse tree' : 'Expand tree'}
        data-state={table.getIsAllRowsExpanded() ? 'expanded' : 'collapsed'}
        {...{ onClick: table.getToggleAllRowsExpandedHandler() }}
      />
      <span className='column-expand-label'>{props.name}</span>
    </div>
  );
}
