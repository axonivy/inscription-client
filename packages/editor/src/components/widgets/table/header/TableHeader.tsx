import './TableHeader.css';
import type { HeaderContext, HeaderGroup, RowSelectionState } from '@tanstack/react-table';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@axonivy/ui-components';

export const TableHeader = ({ children, colSpan, ...props }: React.HTMLAttributes<HTMLTableCellElement> & { colSpan?: number }) => (
  <th className='table-column-header' colSpan={colSpan} {...props}>
    {children}
  </th>
);

export const ResizableHeader = <TData,>({
  children,
  setRowSelection,
  headerGroup,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & {
  setRowSelection?: (value: React.SetStateAction<RowSelectionState>) => void;
  headerGroup: HeaderGroup<TData>;
}) => (
  <tr
    onClick={() => {
      setRowSelection ? setRowSelection({}) : undefined;
    }}
    onDoubleClick={() => {
      headerGroup.headers.forEach(header => {
        header.column.resetSize();
      });
    }}
    {...props}
  >
    {children}
  </tr>
);

export function TextHeader<TData>(props: { header: HeaderContext<TData, unknown>; name: string; seperator?: boolean }) {
  const header = props.header;
  return (
    <div className={`column-text ${props.seperator ? 'has-resizer' : ''}`}>
      <span>{props.name}</span>
      {props.seperator && <ColumnResizer header={header} />}
    </div>
  );
}

export function SortableHeader<TData>(props: { header: HeaderContext<TData, unknown>; name: string; seperator?: boolean }) {
  const header = props.header;
  return (
    <>
      <div className={`column-sort ${props.seperator ? 'has-resizer' : ''}`}>
        <span className='column-sort-label'>{props.name}</span>
        <div className='header-buttons'>
          <Button
            className={header.column.getCanSort() ? 'column-sort-button' : ''}
            aria-label={`Sort by ${props.name}`}
            onClick={header.column.getToggleSortingHandler()}
            data-state={header.column.getIsSorted() || 'unsorted'}
            icon={header.column.getIsSorted() ? IvyIcons.Chevron : IvyIcons.Straighten}
          />
          {props.seperator && <ColumnResizer header={header} />}
        </div>
      </div>
    </>
  );
}

export function ExpandableHeader<TData>(props: { header: HeaderContext<TData, unknown>; name: string; seperator?: boolean }) {
  const header = props.header;
  return (
    <div className={`column-expand ${props.seperator ? 'has-resizer' : ''}`}>
      <div className='header-buttons'>
        <Button
          icon={IvyIcons.Chevron}
          className='column-expand-button'
          aria-label={header.table.getIsAllRowsExpanded() ? 'Collapse tree' : 'Expand tree'}
          data-state={header.table.getIsAllRowsExpanded() ? 'expanded' : 'collapsed'}
          {...{ onClick: header.table.getToggleAllRowsExpandedHandler() }}
        />
        <span className='column-expand-label'>{props.name}</span>
      </div>

      {props.seperator && <ColumnResizer header={header} />}
    </div>
  );
}

function ColumnResizer<TData>(props: { header: HeaderContext<TData, unknown> }) {
  return (
    <div
      onMouseDown={props.header.header.getResizeHandler()}
      onTouchStart={props.header.header.getResizeHandler()}
      className={`resizer ${props.header.column.getIsResizing() ? 'is-resizing' : ''}`}
    />
  );
}
