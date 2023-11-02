import { useMemo, useState, useEffect } from 'react';
import { Checkbox, Collapsible, ExpandableCell, MessageText, SelectRow, Table, TableCell } from '../widgets';
import { UseBrowserImplReturnValue } from './useBrowser';
import {
  ColumnDef,
  ExpandedState,
  FilterFn,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useEditorContext, useMeta } from '../../context';
import { JavaType } from '@axonivy/inscription-protocol';
export const DATATYPE_BROWSER_ID = 'datatype' as const;

export const useDataTypeBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('datatype');
  return {
    id: DATATYPE_BROWSER_ID,
    name: 'Datatype',
    content: <DataTypeBrowser value={value} onChange={setValue} />,
    accept: () => value
  };
};

const DataTypeBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  const { context } = useEditorContext();

  const [mainFilter, setMainFilter] = useState('');
  const { data: allDatatypes, isFetching } = useMeta('meta/scripting/allTypes', { context, type: mainFilter }, []);
  const dataClasses = useMeta('meta/scripting/dataClasses', context, []).data;
  const ivyTypes = useMeta('meta/scripting/ivyTypes', undefined, []).data;

  const [staticTypes, setStaticTypes] = useState<JavaType[]>([]);
  const [dynamicTypes, setDynamicTypes] = useState<JavaType[]>([]);

  const [typeAsList, setTypeAsList] = useState(false);

  const [selectedDataType, setSelectedDataType] = useState<JavaType | undefined>();
  const [showHelper, setShowHelper] = useState(false);

  useEffect(() => {
    const mappedDataClasses: JavaType[] = dataClasses.map<JavaType>(dataClass => ({
      simpleName: dataClass.name,
      ...dataClass
    }));

    setStaticTypes(ivyTypes.concat(mappedDataClasses));

    if (mainFilter.length !== 0) {
      const filteredDynamicTypes = allDatatypes.filter(datatype => {
        const isDuplicate =
          ivyTypes.some(ivyType => ivyType.fullQualifiedName === datatype.fullQualifiedName) ||
          dataClasses.some(dataClass => dataClass.fullQualifiedName === datatype.fullQualifiedName);
        return !isDuplicate;
      });
      setDynamicTypes(filteredDynamicTypes);
    } else {
      setDynamicTypes([]);
    }
  }, [allDatatypes, dataClasses, ivyTypes, mainFilter]);

  useEffect(() => {
    setSelectedDataType(undefined);
    setRowSelection({});
  }, [dynamicTypes.length, mainFilter]);

  const columns = useMemo<ColumnDef<JavaType>[]>(
    () => [
      {
        accessorFn: row => `${row.simpleName} - ${row.packageName}`,
        id: 'simpleName',
        cell: cell => {
          return <ExpandableCell cell={cell} title={cell.row.original.simpleName} />;
        }
      }
    ],
    []
  );

  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [globalFilter, setGlobalFilter] = useState(mainFilter);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const regexFilter: FilterFn<JavaType> = (row, columnId, filterValue) => {
    const cellValue = row.original.simpleName || '';
    const regexPattern = new RegExp(filterValue.replace(/\*/g, '.*'), 'i'); // Convert * to .*
    return regexPattern.test(cellValue);
  };

  const tableStatic = useReactTable({
    data: staticTypes,
    columns: columns,
    state: {
      expanded,
      globalFilter,
      rowSelection
    },
    globalFilterFn: regexFilter,
    filterFromLeafRows: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    enableFilters: true,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  const tableDynamic = useReactTable({
    data: dynamicTypes,
    columns: columns,
    state: {
      expanded,
      globalFilter,
      rowSelection
    },
    globalFilterFn: regexFilter,
    filterFromLeafRows: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    enableFilters: true,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  const addListGeneric = (value: JavaType, typeAsList: boolean) => {
    if (typeAsList) {
      return 'java.util.List<' + value.fullQualifiedName + '>';
    } else {
      return value.fullQualifiedName;
    }
  };

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      setSelectedDataType({ fullQualifiedName: '', packageName: '', simpleName: '' });
      props.onChange('');
      setShowHelper(false);
      return;
    }
    let selectedRow = undefined;
    if (tableStatic.getRowModel().rowsById[Object.keys(rowSelection)[0]]) {
      selectedRow = tableStatic.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    } else {
      selectedRow = tableDynamic.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    }

    setSelectedDataType(selectedRow.original);
    setShowHelper(true);
    props.onChange(addListGeneric(selectedRow.original, typeAsList));
  }, [props, props.onChange, rowSelection, tableDynamic, tableStatic, typeAsList]);

  const [debouncedFilterValue, setDebouncedFilterValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilterValue(globalFilter);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [globalFilter]);

  useEffect(() => {
    if (debouncedFilterValue.length === 0 || debouncedFilterValue.length >= 2) {
      setMainFilter(debouncedFilterValue);
    } else {
      setMainFilter('');
    }
    setExpanded(true);
  }, [debouncedFilterValue]);

  return (
    <>
      <Table
        search={{
          value: globalFilter,
          onChange: newFilterValue => {
            setGlobalFilter(newFilterValue);
          }
        }}
      >
        <tbody>
          {tableStatic.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
          {!isFetching &&
            tableDynamic.getRowModel().rows.map(row => (
              <SelectRow key={row.id} row={row}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </SelectRow>
            ))}
        </tbody>
      </Table>
      {isFetching && (
        <div className='loader'>
          <p>loading more types...</p>
        </div>
      )}
      <Checkbox label='Use Type as List' value={typeAsList} onChange={() => setTypeAsList(!typeAsList)} />
      <Collapsible label='Helper Text' defaultOpen={showHelper} autoClosable={true}>
        {props.value.length !== 0 && selectedDataType ? (
          <pre className='browser-helptext'>
            <b>{props.value}</b>
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
