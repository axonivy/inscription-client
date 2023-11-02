import { useMemo, useEffect, useState } from 'react';
import { ActionCell, Checkbox, Collapsible, ExpandableCell, MessageText, SelectRow, Table, TableCell } from '../widgets';
import { UseBrowserImplReturnValue } from './useBrowser';
import { useAction, useEditorContext, useMeta } from '../../context';
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  RowSelectionState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ContentObject, ContentObjectType } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';

export const CMS_BROWSER_ID = 'cms' as const;

export type CmsTypeFilter = 'STRING' | 'FILE' | 'NONE';

export type CmsOptions = {
  noApiCall?: boolean;
  typeFilter?: CmsTypeFilter;
};

export const useCmsBrowser = (options?: CmsOptions): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('');

  return {
    id: CMS_BROWSER_ID,
    name: 'CMS',
    content: <CmsBrowser value={value} onChange={setValue} noApiCall={options?.noApiCall} typeFilter={options?.typeFilter} />,
    accept: () => value
  };
};

interface CmsBrowserProps {
  value: string;
  onChange: (value: string) => void;
  noApiCall?: boolean;
  typeFilter?: CmsTypeFilter;
}

const CmsBrowser = ({ value, onChange, noApiCall, typeFilter }: CmsBrowserProps) => {
  const { context } = useEditorContext();

  const [requiredProject, setRequiredProject] = useState<boolean>(false);
  const tree = useMeta('meta/cms/tree', { context, requiredProjects: requiredProject }, []).data;

  const [selectedContentObject, setSelectedContentObject] = useState<ContentObject | undefined>();
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const newAction = useAction('newCmsString');

  const columns = useMemo<ColumnDef<ContentObject>[]>(
    () => [
      {
        accessorFn: row => `${row.name} (${row.type})`,
        id: 'name',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.name}
              icon={cell.row.original.type === 'FOLDER' ? IvyIcons.GoToSource : undefined}
            />
          );
        }
      },
      {
        accessorFn: row => row.type,
        id: 'type',
        cell: cell => <span title={cell.row.original.type}>{cell.getValue() as string}</span>
      },
      {
        accessorFn: row => JSON.stringify(row.values),
        id: 'values',
        cell: cell => <span title={JSON.stringify(cell.row.original.values)}>{JSON.stringify(cell.getValue())}</span>
      }
    ],
    []
  );

  const [expanded, setExpanded] = useState<ExpandedState>(false as ExpandedState);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({ type: false, values: false });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    typeFilter === 'NONE' || typeFilter === undefined ? [] : [{ id: 'type', value: typeFilter }]
  );

  const addIvyPathToValue = (value: string, type: ContentObjectType, noApiCall?: boolean) => {
    if (noApiCall || value.length === 0) {
      return value;
    }
    if (type === 'FILE') {
      return `ivy.cms.cr("${value}")`;
    }
    return `ivy.cms.co("${value}")`;
  };

  const table = useReactTable({
    data: tree,
    columns: columns,
    state: {
      expanded,
      globalFilter,
      rowSelection,
      columnFilters,
      columnVisibility
    },
    filterFromLeafRows: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getSubRows: row => row.children,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility
  });

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      setSelectedContentObject({ name: '', children: [], fullPath: '', type: 'STRING', values: {} });
      setShowHelper(false);
      onChange('');
      return;
    }
    const selectedRow = table.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    setSelectedContentObject(selectedRow.original);
    setShowHelper(true);
    onChange(addIvyPathToValue(selectedRow.original.fullPath, selectedRow.original.type, noApiCall));
  }, [onChange, rowSelection, noApiCall, table]);

  return (
    <>
      <Checkbox label='Enable required Projects' value={requiredProject} onChange={() => setRequiredProject(!requiredProject)} />
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
          {table.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row} isNotSelectable={row.original.type === 'FOLDER'}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
              {row.original.type === 'FOLDER' ? (
                <ActionCell
                  actions={[{ label: 'Create new CMS-String', icon: IvyIcons.Add, action: () => newAction(row.original.fullPath) }]}
                />
              ) : (
                <TableCell> </TableCell>
              )}
            </SelectRow>
          ))}
        </tbody>
      </Table>

      <Collapsible label='Helper Text' defaultOpen={showHelper} autoClosable={true}>
        {value.length !== 0 && selectedContentObject ? (
          <pre className='browser-helptext'>
            <b>{value}</b>
            <code>
              {Object.entries(selectedContentObject.values).map(([key, value]) => (
                <div key={key}>
                  <b>{`${key}: `}</b>
                  {value}
                </div>
              ))}
            </code>
          </pre>
        ) : (
          <pre className='browser-helptext'>
            <MessageText
              message={{
                severity: 'INFO',
                message: `No element selected.`
              }}
            />
          </pre>
        )}
      </Collapsible>
    </>
  );
};
