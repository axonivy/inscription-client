import { useEffect, useMemo, useState } from 'react';
import { SelectRow, Table, TableCell, ExpandableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import {
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  type ExpandedState,
  getExpandedRowModel
} from '@tanstack/react-table';
import { useRoles } from '../../parts/common/responsible/useRoles';
import type { RoleMeta } from '@axonivy/inscription-protocol';
export const ROLE_BROWSER = 'role' as const;

export type RoleOptions = {
  showTaskRoles?: boolean;
};

export const useRoleBrowser = (onDoubleClick: () => void, options?: RoleOptions): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });
  return {
    id: ROLE_BROWSER,
    name: 'Role',
    content: (
      <RoleBrowser value={value.cursorValue} onChange={setValue} onDoubleClick={onDoubleClick} showtaskRoles={options?.showTaskRoles} />
    ),
    accept: () => value,
    icon: IvyIcons.Users
  };
};

const RoleBrowser = (props: {
  value: string;
  showtaskRoles?: boolean;
  onChange: (value: BrowserValue) => void;
  onDoubleClick: () => void;
}) => {
  const { rolesAsTree: roleItems } = useRoles(props.showtaskRoles);

  const [showHelper, setShowHelper] = useState(false);

  const columns = useMemo<ColumnDef<RoleMeta>[]>(
    () => [
      {
        accessorFn: row => row.id,
        id: 'name',
        cell: cell => {
          return <ExpandableCell cell={cell} title={cell.row.original.id} icon={IvyIcons.User} additionalInfo={cell.row.original.label} />;
        }
      }
    ],
    []
  );

  const [expanded, setExpanded] = useState<ExpandedState>({ [0]: true, [1]: true, [2]: true, [3]: true });
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: roleItems,
    columns: columns,
    state: { expanded, globalFilter, rowSelection },
    filterFromLeafRows: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    getSubRows: row => row.children,
    getExpandedRowModel: getExpandedRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      props.onChange({ cursorValue: '' });
      setShowHelper(false);
      return;
    }

    const selectedRow = table.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    setShowHelper(true);
    props.onChange({ cursorValue: selectedRow.original.id });
  }, [props, rowSelection, table]);

  return (
    <>
      <Table
        search={{
          value: globalFilter,
          onChange: newFilterValue => {
            setGlobalFilter(newFilterValue);
            setExpanded(true);
          }
        }}
      >
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <SelectRow key={row.id} row={row} onDoubleClick={props.onDoubleClick}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </SelectRow>
            ))
          ) : (
            <tr>
              <TableCell>No Columns found</TableCell>
            </tr>
          )}
        </tbody>
      </Table>
      {showHelper && (
        <pre className='browser-helptext'>
          <b>{props.value}</b>
        </pre>
      )}
    </>
  );
};
