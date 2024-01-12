import {
  useReactTable,
  type ColumnDef,
  type ExpandedState,
  type RowSelectionState,
  getCoreRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
  type Row,
  type VisibilityState,
  type ColumnFilter,
  type ColumnFiltersState,
  type FilterFnOption
} from '@tanstack/react-table';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { SelectRow, Table, TableCell, TableFooter, TableShowMore, type Action, ActionCell } from '../widgets';
import { useVirtualizer } from '@tanstack/react-virtual';

export type GenericData<T> = {
  browserObject: T;
  children: GenericData<T>[];
  isNotSelectable?: boolean;
  specialAction?: Action[];
};

interface GenericBrowserProps<T> {
  data: GenericData<T>[];
  columns: ColumnDef<GenericData<T>>[];
  onRowSelectionChange: (selectedRow: Row<GenericData<T>> | undefined) => void;
  isFetching: boolean;
  additionalComponents: {
    helperTextComponent: ReactNode;
    headerComponent?: ReactNode;
    footerComponent?: ReactNode;
  };
  onRowDoubleClick?: () => void;
  initSearchValue?: string;
  hiddenRows?: { [x: string]: boolean };
  customColumnFilters?: ColumnFilter[];
  ownGlobalFilter?: FilterFnOption<GenericData<T>> | undefined;
  backendSearch?: {
    active: boolean;
    setSearchValue: (value: string) => void;
  };
}

export const GenericBrowser = <T = unknown,>({
  data,
  columns,
  onRowSelectionChange,
  isFetching,
  hiddenRows,
  customColumnFilters,
  ownGlobalFilter,
  backendSearch,
  onRowDoubleClick,
  initSearchValue,
  additionalComponents
}: GenericBrowserProps<T>) => {
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const [expanded, setExpanded] = useState<ExpandedState>({ [0]: true });
  const [globalFilter, setGlobalFilter] = useState(initSearchValue ? initSearchValue : '');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(hiddenRows ? hiddenRows : {});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(customColumnFilters ? customColumnFilters : []);

  const [rowNumber, setRowNumber] = useState(100);

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      expanded,
      globalFilter,
      rowSelection,
      columnFilters,
      columnVisibility
    },
    globalFilterFn: ownGlobalFilter,
    filterFromLeafRows: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    enableFilters: ownGlobalFilter ? true : undefined,
    onExpandedChange: setExpanded,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getSubRows: (originalRow: GenericData<T>): GenericData<T>[] | undefined => {
      if (originalRow.children) {
        return originalRow.children as GenericData<T>[];
      }
      return undefined;
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility
  });

  const { rows } = table.getRowModel();
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length > 0 ? Math.min(rows.length, rowNumber) : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 20
  });

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      onRowSelectionChange(undefined);
      setShowHelper(false);
      return;
    }
    const selectedRow = table.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    onRowSelectionChange(selectedRow);
    setShowHelper(true);
  }, [onRowSelectionChange, rowSelection, table]);

  useEffect(() => {
    setRowSelection({});
  }, [backendSearch?.active]);

  return (
    <>
      {additionalComponents.headerComponent}
      <Table
        search={{
          value: globalFilter,
          onChange: newFilterValue => {
            setGlobalFilter(newFilterValue);
            setExpanded(true);
            setRowNumber(100);
            backendSearch?.active && backendSearch.setSearchValue(newFilterValue);
          }
        }}
        ref={parentRef}
      >
        <tbody>
          {rows.length > 0 ? (
            virtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index];

              return (
                !isFetching && (
                  <SelectRow
                    key={row.id}
                    row={row}
                    isNotSelectable={row.original.isNotSelectable}
                    onDoubleClick={onRowDoubleClick ? onRowDoubleClick : () => {}}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                    {row.original.specialAction ? <ActionCell actions={row.original.specialAction} /> : <TableCell> </TableCell>}
                  </SelectRow>
                )
              );
            })
          ) : (
            <tr key='no-data'>
              <TableCell>No result found, enter a fitting search term</TableCell>
            </tr>
          )}
        </tbody>

        {rowNumber < rows.length && (
          <TableFooter>
            <TableShowMore
              colSpan={4}
              showMore={() => setRowNumber(old => old + 100)}
              helpertext={rowNumber + ' out of ' + rows.length + ' shown'}
            />
          </TableFooter>
        )}
      </Table>
      {isFetching && (
        <div className='loader'>
          <p>loading more types...</p>
        </div>
      )}
      {showHelper && (
        <>
          <pre className='browser-helptext'>{additionalComponents.helperTextComponent}</pre>
        </>
      )}
      {additionalComponents.footerComponent}
    </>
  );
};
