import { useEffect, useMemo, useState } from 'react';
import { ExpandableCell, SelectRow, Table, TableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import { useEditorContext, useMeta } from '../../../context';
import {
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table';
import type { CategoryPathMeta, CategoryType } from '@axonivy/inscription-protocol';
export const CAT_PATH_CHOOSER_BROWSER_ID = 'catPath' as const;

export const useCatPathChooserBrowser = (onDoubleClick: () => void, location: string): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });

  return {
    id: CAT_PATH_CHOOSER_BROWSER_ID,
    name: 'Category Path Chooser',
    content: <CatPathChooserBrowser value={value.cursorValue} onChange={setValue} location={location} onDoubleClick={onDoubleClick} />,
    accept: () => value,
    icon: IvyIcons.Label
  };
};

const CatPathChooserBrowser = (props: {
  value: string;
  onChange: (value: BrowserValue) => void;
  location: string;
  onDoubleClick: () => void;
}) => {
  const { context } = useEditorContext();

  const type = (): CategoryType => {
    const location = props.location.toLowerCase();
    if (location.includes('request') || location.includes('start')) {
      return 'START';
    }
    if (location.includes('case')) {
      return 'CASE';
    }
    if (location.includes('task')) {
      return 'TASK';
    }
    return '' as CategoryType;
  };
  const { data } = useMeta('meta/workflow/categoryPaths', { context, type: type() }, []);
  const [showHelper, setShowHelper] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<CategoryPathMeta>();

  const columns = useMemo<ColumnDef<CategoryPathMeta>[]>(
    () => [
      {
        accessorFn: row => row.path,
        id: 'name',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.path}
              icon={IvyIcons.Label}
              additionalInfo={`${cell.row.original.project} > ${cell.row.original.usage === 1 ? cell.row.original.process : ''} (${
                cell.row.original.usage
              } usage)`}
            />
          );
        }
      }
    ],
    []
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      globalFilter,
      rowSelection
    },
    filterFromLeafRows: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      setShowHelper(false);
      props.onChange({ cursorValue: '' });
      setSelectedCat({ path: '', process: '', project: '', usage: 0 });
      return;
    }
    const selectedRow = table.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    props.onChange({ cursorValue: selectedRow.original.path });
    setSelectedCat(selectedRow.original);
    setShowHelper(true);
  }, [props, rowSelection, table]);

  return (
    <>
      <Table
        search={{
          value: globalFilter,
          onChange: newFilterValue => {
            setGlobalFilter(newFilterValue);
            setSelectedCat({ path: '', process: '', project: '', usage: 0 });
            setRowSelection({});
          }
        }}
      >
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            <>
              {table.getRowModel().rows.map(row => (
                <SelectRow key={row.id} row={row} onDoubleClick={props.onDoubleClick}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </SelectRow>
              ))}
            </>
          ) : (
            <tr>
              <TableCell>No Category found</TableCell>
            </tr>
          )}
        </tbody>
      </Table>
      {showHelper && (
        <pre className='browser-helptext'>
          <b>{props.value}</b>
          <code>
            <b>Project:</b> {selectedCat?.project}
            <br />
            {selectedCat?.usage === 1 && (
              <>
                <b>Process:</b> {selectedCat?.process}
                <br />
              </>
            )}
            <b>Usage:</b> {selectedCat?.usage}
          </code>
        </pre>
      )}
    </>
  );
};
