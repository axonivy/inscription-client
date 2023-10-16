import { useMemo, useEffect, useState } from 'react';
import { Checkbox, Collapsible, ExpandableCell, MessageText, SelectRow, Table, TableCell } from '../widgets';
import { UseBrowserImplReturnValue } from './useBrowser';
import { useEditorContext, useMeta } from '../../context';
import {
  ColumnDef,
  ExpandedState,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ContentObject } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';

export const CMS_BROWSER_ID = 'cms' as const;

export const useCmsBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('');

  return {
    id: CMS_BROWSER_ID,
    name: 'CMS',
    content: <CmsBrowser value={value} onChange={setValue} />,
    accept: () => addIvyPathToValue(value)
  };
};

export const addIvyPathToValue = (value: string) => {
  const fullPath = value.length === 0 ? '' : `ivy.cms.co("${value}")`;
  return fullPath;
};

const CmsBrowser = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const { context } = useEditorContext();

  const [requiredProject, setRequiredProject] = useState<boolean>(false);
  const tree = useMeta('meta/cms/tree', { context, requiredProjects: requiredProject }, []).data;
  const [selectedContentObject, setSelectedContentObject] = useState<ContentObject | undefined>();
  const [showHelper, setShowHelper] = useState<boolean>(false);

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
      }
    ],
    []
  );

  const [expanded, setExpanded] = useState<ExpandedState>(false as ExpandedState);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: tree,
    columns: columns,
    state: {
      expanded,
      globalFilter,
      rowSelection
    },
    filterFromLeafRows: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getSubRows: row => row.children,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
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
    onChange(selectedRow.original.fullPath);
  }, [onChange, rowSelection, table]);

  return (
    <>
      <Checkbox label='Enable required Projects' value={requiredProject} onChange={() => setRequiredProject(!requiredProject)} />
      <Table search={{ value: globalFilter, onChange: setGlobalFilter }}>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row} isNotSelectable={row.original.type === 'FOLDER'}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
        </tbody>
      </Table>

      <Collapsible label='Helper Text' defaultOpen={showHelper}>
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
