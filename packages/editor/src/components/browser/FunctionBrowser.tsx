import { useEffect, useMemo, useState } from 'react';
import { ExpandableCell, SelectRow, Table, TableCell } from '../widgets';
import type { UseBrowserImplReturnValue } from './useBrowser';
import type { Function } from '@axonivy/inscription-protocol';
import {
  useReactTable,
  type ColumnDef,
  type ExpandedState,
  type RowSelectionState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  flexRender,
  type Row
} from '@tanstack/react-table';
import { IvyIcons } from '@axonivy/editor-icons';
import { useEditorContext, useMeta } from '../../context';
export const FUNCTION_BROWSER_ID = 'func' as const;

export const useFuncBrowser = (onDoubleClick: () => void): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('function');
  return {
    id: FUNCTION_BROWSER_ID,
    name: 'Function',
    content: <FunctionBrowser value={value} onChange={setValue} onDoubleClick={onDoubleClick} />,
    accept: () => value,
    icon: IvyIcons.Function
  };
};

const FunctionBrowser = (props: { value: string; onChange: (value: string) => void; onDoubleClick: () => void }) => {
  const { context } = useEditorContext();
  const [method, setMethod] = useState('');
  const [paramTypes, setParamTypes] = useState<string[]>([]);
  const [type, setType] = useState('');

  const { data: tree } = useMeta('meta/scripting/functions', undefined, []);
  const { data: doc } = useMeta('meta/scripting/apiDoc', { context, method, paramTypes, type }, '');

  const [selectedFunctionDoc, setSelectedFunctionDoc] = useState('');

  const [showHelper, setShowHelper] = useState<boolean>(false);

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
    getSubRows: row => (row.returnType ? row.returnType.functions : []),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  useEffect(() => {
    const getParentNames = (currentRow: Row<Function>, parentNames: string[] = []): string[] => {
      parentNames.push(currentRow.original.name);
      const parentRow = currentRow.getParentRow();
      if (parentRow !== undefined) {
        return getParentNames(parentRow, parentNames);
      }
      return parentNames;
    };

    if (Object.keys(rowSelection).length !== 1) {
      setShowHelper(false);
      props.onChange('');
      return;
    }
    const selectedRow = table.getRowModel().rowsById[Object.keys(rowSelection)[0]];

    //setup correct functionName for the accept-method
    const parentNames = getParentNames(selectedRow);
    const selectedName = parentNames.reverse().join('.');
    props.onChange(
      selectedRow.original.isField
        ? selectedName
        : selectedName + '(' + selectedRow.original.params.map(param => param.type.split('.').pop()).join(', ') + ')'
    );

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
            setExpanded(true);
          }
        }}
      >
        <tbody>
          {table.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row} onDoubleClick={props.onDoubleClick}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
        </tbody>
      </Table>
      {showHelper && (
        <pre className='browser-helptext' dangerouslySetInnerHTML={{ __html: `<b>${props.value}</b>${selectedFunctionDoc}` }} />
      )}
    </>
  );
};
