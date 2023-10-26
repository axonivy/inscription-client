import { useMemo, useState, useEffect } from 'react';
import { Checkbox, Collapsible, ExpandableCell, MessageText, SelectRow, Table, TableCell } from '../widgets';
import { UseBrowserImplReturnValue } from './useBrowser';
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

  const [datatypeList, setDatatypeList] = useState<JavaType[]>([]);
  const [mainFilter, setMainFilter] = useState('');
  const allDatatypes = useMeta('meta/scripting/allTypes', { context, type: mainFilter }, []).data;
  const dataClasses = useMeta('meta/scripting/dataClasses', context, []).data;

  const [typeAsList, setTypeAsList] = useState(false);

  const [selectedDataType, setSelectedDataType] = useState<JavaType | undefined>();
  const [showHelper, setShowHelper] = useState(false);

  useEffect(() => {
    const mappedDataClasses: JavaType[] = dataClasses.map<JavaType>(dataClass => ({
      simpleName: dataClass.name,
      ...dataClass
    }));

    let combinedList: JavaType[] = [];

    if (mainFilter.length === 0) {
      combinedList = mappedDataClasses;
    } else {
      combinedList = allDatatypes.concat(mappedDataClasses);
    }

    // Remove duplicates based on 'fullQualifiedName'
    const uniqueList: JavaType[] = combinedList.reduce((accumulator: JavaType[], current: JavaType) => {
      const existingItem = accumulator.find(item => item.fullQualifiedName === current.fullQualifiedName);
      if (!existingItem) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

    setDatatypeList(uniqueList);
  }, [allDatatypes, dataClasses, mainFilter]);

  useEffect(() => {
    setSelectedDataType(undefined);
    setRowSelection({});
  }, [mainFilter]);

  const columns = useMemo<ColumnDef<JavaType>[]>(
    () => [
      {
        accessorFn: row => row.simpleName,
        id: 'simpleName',
        cell: cell => {
          return <ExpandableCell cell={cell} title={cell.row.original.simpleName} />;
        }
      },
      {
        accessorFn: row => row.packageName,
        id: 'packageName',
        cell: cell => <span title={cell.row.original.packageName}>{cell.getValue() as string}</span>
      },
      {
        accessorFn: row => row.fullQualifiedName,
        id: 'fullQualifiedName',
        cell: cell => <span title={cell.row.original.fullQualifiedName}>{cell.getValue() as string}</span>
      }
    ],
    []
  );

  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [globalFilter, setGlobalFilter] = useState(mainFilter);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: datatypeList,
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
    const selectedRow = table.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    setSelectedDataType(selectedRow.original);
    setShowHelper(true);
    props.onChange(addListGeneric(selectedRow.original, typeAsList));
  }, [props, props.onChange, rowSelection, table, typeAsList]);

  return (
    <>
      <Table
        search={{
          value: globalFilter,
          onChange: newFilterValue => {
            setGlobalFilter(newFilterValue);
            setMainFilter(newFilterValue);
            setExpanded(true);
          }
        }}
      >
        <tbody>
          {table.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
        </tbody>
      </Table>
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
