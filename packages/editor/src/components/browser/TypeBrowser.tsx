import { useMemo, useState, useEffect } from 'react';
import { Checkbox, ExpandableCell, SelectRow, Table, TableCell } from '../widgets';
import type { UseBrowserImplReturnValue } from './useBrowser';
import type { ColumnDef, ExpandedState, FilterFn, RowSelectionState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { useEditorContext, useMeta } from '../../context';
import type { JavaType } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
export const TYPE_BROWSER_ID = 'type' as const;

export const useTypeBrowser = (onDoubleClick: () => void): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('type');
  return {
    id: TYPE_BROWSER_ID,
    name: 'Type',
    content: <TypeBrowser value={value} onChange={setValue} onDoubleClick={onDoubleClick} />,
    accept: () => value,
    icon: IvyIcons.DataClass
  };
};

const TypeBrowser = (props: { value: string; onChange: (value: string) => void; onDoubleClick: () => void }) => {
  type TypeBrowserObject = JavaType & {
    icon: IvyIcons;
  };

  const { context } = useEditorContext();

  const [allSearchActive, setAllSearchActive] = useState(false);

  const [mainFilter, setMainFilter] = useState('');
  const { data: allDatatypes, isFetching } = useMeta('meta/scripting/allTypes', { context, limit: 150, type: mainFilter }, []);
  const dataClasses = useMeta('meta/scripting/dataClasses', context, []).data;
  const ivyTypes = useMeta('meta/scripting/ivyTypes', undefined, []).data;

  const [types, setTypes] = useState<TypeBrowserObject[]>([]);

  const [typeAsList, setTypeAsList] = useState(false);

  const [showHelper, setShowHelper] = useState(false);

  useEffect(() => {
    const typeComparator = (a: TypeBrowserObject, b: TypeBrowserObject) => {
      const fqCompare = a.fullQualifiedName.localeCompare(b.fullQualifiedName);
      if (fqCompare !== 0) {
        return fqCompare;
      }
      return a.simpleName.localeCompare(b.simpleName);
    };

    if (allSearchActive) {
      if (mainFilter.length > 0) {
        allDatatypes.sort((a, b) => a.simpleName.localeCompare(b.simpleName));
      }
      const mappedAllTypes: TypeBrowserObject[] = allDatatypes.map<TypeBrowserObject>(type => ({
        icon: IvyIcons.DataClass,
        ...type
      }));
      setTypes(mainFilter.length > 0 ? mappedAllTypes : []);
    } else {
      const mappedDataClasses: TypeBrowserObject[] = dataClasses.map<TypeBrowserObject>(dataClass => ({
        simpleName: dataClass.name,
        icon: IvyIcons.EditDots,
        ...dataClass
      }));
      const mappedIvyTypes: TypeBrowserObject[] = ivyTypes.map<TypeBrowserObject>(ivyType => ({
        icon: IvyIcons.File,
        ...ivyType
      }));

      const sortedIvyTypes = mappedIvyTypes.sort(typeComparator);
      const sortedMappedDataClasses = mappedDataClasses.sort(typeComparator);

      const sortedTypes: TypeBrowserObject[] = sortedMappedDataClasses.concat(sortedIvyTypes);
      setTypes(sortedTypes);
    }
  }, [allDatatypes, allSearchActive, dataClasses, ivyTypes, mainFilter]);

  useEffect(() => {
    setRowSelection({});
  }, [setTypes.length, mainFilter]);

  const columns = useMemo<ColumnDef<TypeBrowserObject>[]>(
    () => [
      {
        accessorFn: row => row.simpleName,
        id: 'simpleName',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.simpleName}
              additionalInfo={cell.row.original.packageName}
              icon={cell.row.original.icon}
            />
          );
        }
      }
    ],
    []
  );

  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [globalFilter, setGlobalFilter] = useState(mainFilter);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const regexFilter: FilterFn<TypeBrowserObject> = (row, columnId, filterValue) => {
    const cellValue = row.original.simpleName || '';
    const regexPattern = new RegExp(filterValue.replace(/\*/g, '.*'), 'i');
    return regexPattern.test(cellValue);
  };

  const tableDynamic = useReactTable({
    data: types,
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

  useEffect(() => {
    const addListGeneric = (value: TypeBrowserObject, typeAsList: boolean) => {
      if (typeAsList) {
        return 'java.util.List<' + value.fullQualifiedName + '>';
      } else {
        return value.fullQualifiedName;
      }
    };

    if (Object.keys(rowSelection).length !== 1) {
      props.onChange('');
      setShowHelper(false);
      return;
    }
    let selectedRow = undefined;
    selectedRow = tableDynamic.getRowModel().rowsById[Object.keys(rowSelection)[0]];

    setShowHelper(true);
    props.onChange(addListGeneric(selectedRow.original, typeAsList));
  }, [props, props.onChange, rowSelection, tableDynamic, typeAsList]);

  const [debouncedFilterValue, setDebouncedFilterValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilterValue(globalFilter);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [globalFilter]);

  useEffect(() => {
    if (debouncedFilterValue.length > 0) {
      setMainFilter(debouncedFilterValue);
    } else {
      setMainFilter('');
    }
    setExpanded(true);
  }, [debouncedFilterValue]);

  return (
    <>
      <div className='browser-table-header'>
        <Checkbox
          label='Search over all types'
          value={allSearchActive}
          onChange={() => {
            setAllSearchActive(!allSearchActive);
            setRowSelection({});
          }}
        />
      </div>
      <Table
        search={{
          value: globalFilter,
          onChange: newFilterValue => {
            setGlobalFilter(newFilterValue);
          }
        }}
      >
        <tbody>
          {tableDynamic.getRowModel().rows.length > 0 ? (
            <>
              {!isFetching &&
                tableDynamic.getRowModel().rows.map(row => (
                  <SelectRow key={row.id} row={row} onDoubleClick={props.onDoubleClick}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </SelectRow>
                ))}
            </>
          ) : (
            <tr>
              <TableCell>No type found, enter a fitting search term</TableCell>
            </tr>
          )}
        </tbody>
      </Table>
      {isFetching && (
        <div className='loader'>
          <p>loading more types...</p>
        </div>
      )}
      {showHelper && (
        <pre className='browser-helptext'>
          <b>{props.value}</b>
        </pre>
      )}
      <Checkbox label='Use Type as List' value={typeAsList} onChange={() => setTypeAsList(!typeAsList)} />
    </>
  );
};
