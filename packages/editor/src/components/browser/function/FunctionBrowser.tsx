import { useEffect, useMemo, useRef, useState } from 'react';
import { ExpandableCell, SelectRow, Table, TableCell, TableFooter, TableShowMore } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import type { Function } from '@axonivy/inscription-protocol';
import {
  useReactTable,
  type ColumnDef,
  type ExpandedState,
  type RowSelectionState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { IvyIcons } from '@axonivy/ui-icons';
import type { BrowserValue } from '../Browser';
import { useEditorContext, useMeta } from '../../../context';
import { getParentNames } from './parent-name';
export const FUNCTION_BROWSER_ID = 'func' as const;

export const useFuncBrowser = (onDoubleClick: () => void): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });
  return {
    id: FUNCTION_BROWSER_ID,
    name: 'Function',
    content: <FunctionBrowser value={value.cursorValue} onChange={setValue} onDoubleClick={onDoubleClick} />,
    accept: () => value,
    icon: IvyIcons.Function
  };
};

const FunctionBrowser = (props: { value: string; onChange: (value: BrowserValue) => void; onDoubleClick: () => void }) => {
  const { context } = useEditorContext();
  const [method, setMethod] = useState('');
  const [paramTypes, setParamTypes] = useState<string[]>([]);
  const [type, setType] = useState('');
  const [sortedTree, setSortedTree] = useState<Function[]>([]);
  const { data: tree } = useMeta('meta/scripting/functions', undefined, []);
  const { data: doc } = useMeta('meta/scripting/apiDoc', { context, method, paramTypes, type }, '');

  const [rowNumber, setRowNumber] = useState(100);

  const [selectedFunctionDoc, setSelectedFunctionDoc] = useState('');

  const [showHelper, setShowHelper] = useState<boolean>(false);

  useEffect(() => {
    if (tree && tree.length > 0) {
      // Extracting and sorting functions inside root.returnType alphabetically
      const sortedReturnTypes = tree
        .map(entry => entry.returnType)
        .filter(returnType => returnType)
        .map(returnType => ({
          ...returnType,
          functions: returnType.functions.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }))
        }));

      // Replace the root.returnType from sortedData with the sortedReturnTypes
      const finalSortedData = tree.map((entry, index) => ({
        ...entry,
        returnType: sortedReturnTypes[index]
      }));

      setSortedTree(finalSortedData);
    }
  }, [tree]);

  const columns = useMemo<ColumnDef<Function>[]>(
    () => [
      {
        accessorFn: row =>
          `${row.name.split('.').pop()}${
            row.isField === false ? `(${row.params.map(param => param.type.split('.').pop()).join(', ')})` : ''
          }`,
        id: 'name',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.name}
              icon={cell.row.original.isField ? IvyIcons.FolderOpen : IvyIcons.Function}
              additionalInfo={cell.row.original.returnType ? cell.row.original.returnType.simpleName : 'no return type defined'}
            />
          );
        }
      }
    ],
    []
  );

  const [expanded, setExpanded] = useState<ExpandedState>({ [0]: true });
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: sortedTree,
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
    getSubRows: row => (row.returnType ? row.returnType.functions : []),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
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
      setShowHelper(false);
      props.onChange({ cursorValue: '' });
      return;
    }
    const selectedRow = table.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    //setup correct functionName for the accept-method
    const parentNames = getParentNames(selectedRow);
    const selectedName = parentNames.reverse().join('.');
    props.onChange({ cursorValue: selectedName });

    //setup Meta-Call for docApi
    const parentRow = selectedRow.getParentRow();
    setType(
      parentRow
        ? parentRow.original.returnType.packageName + '.' + parentRow.original.returnType.simpleName
        : selectedRow.original.returnType.packageName + '.' + selectedRow.original.returnType.simpleName
    );
    setMethod(selectedRow.original.name);
    setParamTypes(selectedRow.original.params.map(param => param.type));
    //setup Helpertext
    setSelectedFunctionDoc(doc);
    setShowHelper(true);
  }, [doc, props, rowSelection, table]);

  return (
    <>
      <Table
        search={{
          value: globalFilter,
          onChange: newFilterValue => {
            setGlobalFilter(newFilterValue);
            setExpanded(newFilterValue.length > 0 ? true : { [0]: true });
            setRowSelection({});
            setRowNumber(100);
          }
        }}
        ref={parentRef}
      >
        <tbody>
          {virtualizer.getVirtualItems().map(virtualRow => {
            const row = rows[virtualRow.index];
            return (
              <SelectRow key={row.id} row={row} onDoubleClick={props.onDoubleClick}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </SelectRow>
            );
          })}
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
      {showHelper && (
        <pre className='browser-helptext' dangerouslySetInnerHTML={{ __html: `<b>${props.value}</b>${selectedFunctionDoc}` }} />
      )}
    </>
  );
};
