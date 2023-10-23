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
import { DataClass, JavaType } from '@axonivy/inscription-protocol';
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
  const [mainFilter, setMainFilter] = useState<string>('');
  const allDatatypes: JavaType[] = useMeta('meta/scripting/allTypes', { context, type: mainFilter }, []).data;
  const dataClasses: DataClass[] = useMeta('meta/scripting/dataClasses', context, []).data;

  const [typeAsList, setTypeAsList] = useState(false);
  const [listtypeSelected, setListtypeSelected] = useState(false);

  const [selectedDataType, setSelectedDataType] = useState<JavaType | undefined>();
  const [showHelper, setShowHelper] = useState(false);

  // Shorter useEffect for merging useMeta's (unfortunately i noticed that in the megat "allTypes" there are also types from the meta "dataClasses", so i created a new useEffect which removes these duplicates.)
  //  useEffect(() => {
  //    const mappedDataClasses: JavaType[] = dataClasses.map<JavaType>(dataClass => ({ simpleName: dataClass.name, ...dataClass }));
  //    if (mainFilter.length === 0) {
  //      setDatatypeList(mappedDataClasses);
  //    } else {
  //      setDatatypeList(allDatatypes.concat(mappedDataClasses));
  //   }
  //  }, [allDatatypes, dataClasses, mainFilter]);

  //new useEffect, which removes duplicates
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

    if (typeAsList) {
      const uniqueListNoListElements: JavaType[] = uniqueList.filter(item => item.simpleName !== 'List');
      setDatatypeList(uniqueListNoListElements);
    } else {
      setDatatypeList(uniqueList);
    }
  }, [allDatatypes, dataClasses, mainFilter, typeAsList]);

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
      return 'java.util.List<' + value.simpleName + '>';
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
    if (selectedRow.original.simpleName === 'List') {
      setListtypeSelected(true);
    } else {
      setListtypeSelected(false);
    }
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
      {!listtypeSelected && (
        <>
          {(props.value.length !== 0 && selectedDataType) || mainFilter === 'List' ? (
            <>
              {mainFilter === 'List' && typeAsList && (
                <MessageText
                  message={{
                    severity: 'WARNING',
                    message: `The "Use Type as List" checkmark is still enabled, causing lists not to be displayed.`
                  }}
                />
              )}
              <Checkbox label='Use Type as List' value={typeAsList} onChange={() => setTypeAsList(!typeAsList)} />
            </>
          ) : null}
        </>
      )}

      <Collapsible label='Helper Text' defaultOpen={showHelper} autoClosable={true}>
        {props.value.length !== 0 && selectedDataType ? (
          <pre className='browser-helptext'>
            <b>{props.value}</b>
            <code>
              <div>
                {selectedDataType.simpleName} - {selectedDataType.packageName}
              </div>
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
