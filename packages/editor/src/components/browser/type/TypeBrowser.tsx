import { useMemo, useState, useEffect } from 'react';
import { Checkbox, ExpandableCell, SelectRow, Table, TableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import type { ColumnDef, ExpandedState, FilterFn, RowSelectionState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { useEditorContext, useMeta } from '../../../context';
import type { JavaType } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import { getCursorValue } from './cursor-value';
export const TYPE_BROWSER_ID = 'type' as const;

export type TypeBrowserObject = JavaType & { icon: IvyIcons };

export const useTypeBrowser = (onDoubleClick: () => void, initSearchFilter: () => string, location: string): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });
  return {
    id: TYPE_BROWSER_ID,
    name: 'Type',
    content: (
      <TypeBrowser
        value={value.cursorValue}
        onChange={setValue}
        onDoubleClick={onDoubleClick}
        location={location}
        initSearchFilter={initSearchFilter}
      />
    ),
    accept: () => value,
    icon: IvyIcons.DataClass
  };
};

interface TypeBrowserProps {
  value: string;
  onChange: (value: BrowserValue) => void;
  onDoubleClick: () => void;
  initSearchFilter: () => string;
  location: string;
}

const TypeBrowser = ({ value, onChange, onDoubleClick, initSearchFilter, location }: TypeBrowserProps) => {
  const { context } = useEditorContext();

  const [allSearchActive, setAllSearchActive] = useState(false);

  const [mainFilter, setMainFilter] = useState('');
  const { data: allDatatypes, isFetching } = useMeta('meta/scripting/allTypes', { context, limit: 150, type: mainFilter }, []);
  const dataClasses = useMeta('meta/scripting/dataClasses', context, []).data;
  const ivyTypes = useMeta('meta/scripting/ivyTypes', undefined, []).data;
  const ownTypes = useMeta('meta/scripting/ownTypes', { context, limit: 100, type: '' }, []).data;

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

    const ivyTypeComparator = (a: TypeBrowserObject, b: TypeBrowserObject) => {
      const aHasJava = a.fullQualifiedName.startsWith('java.lang');
      const bHasJava = b.fullQualifiedName.startsWith('java.lang');
      if (aHasJava && !bHasJava) {
        return -1;
      }
      if (!aHasJava && bHasJava) {
        return 1;
      }
      return typeComparator(a, b);
    };

    if (allSearchActive) {
      if (mainFilter.length > 0) {
        allDatatypes.sort((a, b) => a.simpleName.localeCompare(b.simpleName));
      }
      const mappedAllTypes: TypeBrowserObject[] = allDatatypes.map<TypeBrowserObject>(type => ({
        icon: dataClasses.find(dc => dc.fullQualifiedName === type.fullQualifiedName)
          ? IvyIcons.LetterD
          : type.fullQualifiedName.includes('ivy')
          ? IvyIcons.Ivy
          : IvyIcons.DataClass,
        ...type
      }));
      setTypes(mainFilter.length > 0 ? mappedAllTypes : []);
    } else {
      const mappedDataClasses: TypeBrowserObject[] = dataClasses.map<TypeBrowserObject>(dataClass => ({
        simpleName: dataClass.name,
        icon: IvyIcons.LetterD,
        ...dataClass
      }));
      const mappedIvyTypes: TypeBrowserObject[] = ivyTypes.map<TypeBrowserObject>(ivyType => ({
        icon: ivyType.fullQualifiedName.includes('ivy') ? IvyIcons.Ivy : IvyIcons.DataClass,
        ...ivyType
      }));
      const ownTypesWithoutDataClasses = ownTypes.filter(
        ownType => !mappedDataClasses.find(dataClass => dataClass.fullQualifiedName === ownType.fullQualifiedName)
      );
      const sortedIvyTypes = mappedIvyTypes.sort(ivyTypeComparator);
      const sortedMappedDataClasses = mappedDataClasses.sort(typeComparator);
      if (location.includes('code')) {
        const mappedOwnTypes: TypeBrowserObject[] = ownTypesWithoutDataClasses.map<TypeBrowserObject>(ownType => ({
          icon: IvyIcons.DataClass,
          ...ownType
        }));
        const sortedMappedOwnTypes = mappedOwnTypes.sort(typeComparator);
        setTypes(sortedMappedOwnTypes.concat(sortedMappedDataClasses).concat(sortedIvyTypes));
      } else {
        setTypes(sortedMappedDataClasses.concat(sortedIvyTypes));
      }
    }
  }, [allDatatypes, allSearchActive, dataClasses, ivyTypes, location, mainFilter, ownTypes]);

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
  const [globalFilter, setGlobalFilter] = useState(initSearchFilter);
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
    if (Object.keys(rowSelection).length !== 1) {
      onChange({ cursorValue: '' });
      setShowHelper(false);
      return;
    }

    const selectedRow = tableDynamic.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    setShowHelper(true);
    const isIvyType = ivyTypes.some(javaClass => javaClass.fullQualifiedName === selectedRow.original.fullQualifiedName);
    if (location.includes('code')) {
      onChange({
        cursorValue: getCursorValue(selectedRow.original, isIvyType, typeAsList, true),
        firstLineValue: isIvyType ? undefined : 'import ' + selectedRow.original.fullQualifiedName + ';\n'
      });
    } else {
      onChange({
        cursorValue: getCursorValue(selectedRow.original, isIvyType, typeAsList, false)
      });
    }
  }, [ivyTypes, location, onChange, rowSelection, tableDynamic, typeAsList]);

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
                  <SelectRow key={row.id} row={row} onDoubleClick={onDoubleClick}>
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
          <b>{value}</b>
        </pre>
      )}
      <Checkbox label='Use Type as List' value={typeAsList} onChange={() => setTypeAsList(!typeAsList)} />
    </>
  );
};
