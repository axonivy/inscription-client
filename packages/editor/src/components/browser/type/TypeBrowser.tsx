import { useMemo, useState, useEffect } from 'react';
import { Checkbox, ExpandableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import type { ColumnDef, FilterFn, Row } from '@tanstack/react-table';
import { useEditorContext, useMeta } from '../../../context';
import type { JavaType } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import { getCursorValue } from './cursor-value';
import { GenericBrowser, type GenericData } from '../GenericBrowser';
import { mapToGenericData } from '../transformData';
export const TYPE_BROWSER_ID = 'type' as const;

export type TypeBrowserObject = JavaType & { icon: IvyIcons };

export const useTypeBrowser = (location: string): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });
  return {
    id: TYPE_BROWSER_ID,
    name: 'Type',
    content: <TypeBrowser value={value.cursorValue} onChange={setValue} location={location} />,
    accept: () => value,
    icon: IvyIcons.DataClass
  };
};

interface TypeBrowserProps {
  value: string;
  onChange: (value: BrowserValue) => void;
  location: string;
}

const TypeBrowser = ({ value, onChange, location }: TypeBrowserProps) => {
  const { context } = useEditorContext();

  const [allSearchActive, setAllSearchActive] = useState(false);

  const [backendMainFilter, setBackendMainFilter] = useState('');
  const { data: allDatatypes, isFetching } = useMeta('meta/scripting/allTypes', { context, limit: 150, type: backendMainFilter }, []);
  const dataClasses = useMeta('meta/scripting/dataClasses', context, []).data;
  const ivyTypes = useMeta('meta/scripting/ivyTypes', undefined, []).data;
  const ownTypes = useMeta('meta/scripting/ownTypes', { context, limit: 100, type: '' }, []).data;

  const [mappedSortedData, setMappedSortedData] = useState<GenericData<TypeBrowserObject>[]>([]);

  const [typeAsList, setTypeAsList] = useState(false);

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
    //check if backend search is Activ
    if (allSearchActive) {
      if (backendMainFilter.length > 0) {
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
      const mappedFinalSortedData = mappedAllTypes.map(entry => mapToGenericData(entry));
      setMappedSortedData(backendMainFilter.length > 0 ? mappedFinalSortedData : []);
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
      const sortedIvyTypes = mappedIvyTypes.sort(ivyTypeComparator).map(entry => mapToGenericData(entry));
      const sortedMappedDataClasses = mappedDataClasses.sort(typeComparator).map(entry => mapToGenericData(entry));
      //check if browser is open in code-part
      if (location.includes('code')) {
        const mappedOwnTypes: TypeBrowserObject[] = ownTypesWithoutDataClasses.map<TypeBrowserObject>(ownType => ({
          icon: IvyIcons.DataClass,
          ...ownType
        }));
        const sortedMappedOwnTypes = mappedOwnTypes.sort(typeComparator).map(entry => mapToGenericData(entry));
        setMappedSortedData(sortedMappedOwnTypes.concat(sortedMappedDataClasses).concat(sortedIvyTypes));
      } else {
        setMappedSortedData(sortedMappedDataClasses.concat(sortedIvyTypes));
      }
    }
  }, [allDatatypes, allSearchActive, backendMainFilter.length, dataClasses, ivyTypes, location, ownTypes]);

  const columns = useMemo<ColumnDef<GenericData<TypeBrowserObject>>[]>(
    () => [
      {
        accessorFn: row => row.browserObject.simpleName,
        id: 'simpleName',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.browserObject.simpleName}
              additionalInfo={cell.row.original.browserObject.packageName}
              icon={cell.row.original.browserObject.icon}
            />
          );
        }
      }
    ],
    []
  );

  const regexFilter: FilterFn<GenericData<TypeBrowserObject>> = (row, columnId, filterValue) => {
    const cellValue = row.original.browserObject.simpleName || '';
    const regexPattern = new RegExp(filterValue.replace(/\*/g, '.*'), 'i');
    return regexPattern.test(cellValue);
  };

  const handleRowSelectionChange = (selectedRow: Row<GenericData<TypeBrowserObject>> | undefined) => {
    if (!selectedRow) {
      onChange({ cursorValue: '' });
      return;
    }
    const isIvyType = ivyTypes.some(javaClass => javaClass.fullQualifiedName === selectedRow.original.browserObject.fullQualifiedName);
    if (location.includes('code')) {
      onChange({
        cursorValue: getCursorValue(selectedRow.original, isIvyType, typeAsList, true),
        firstLineValue: isIvyType || typeAsList ? undefined : 'import ' + selectedRow.original.browserObject.fullQualifiedName + ';\n'
      });
    } else {
      onChange({
        cursorValue: getCursorValue(selectedRow.original, isIvyType, typeAsList, false)
      });
    }
  };

  return (
    <>
      <div className='browser-table-header'>
        <Checkbox
          label='Search over all types'
          value={allSearchActive}
          onChange={() => {
            setAllSearchActive(!allSearchActive);
          }}
        />
      </div>
      <GenericBrowser
        columns={columns}
        data={mappedSortedData}
        onRowSelectionChange={handleRowSelectionChange}
        value={value}
        ownGlobalFilter={regexFilter}
        isFetching={isFetching}
        backendSearch={{ active: allSearchActive, setSearchValue: setBackendMainFilter }}
      />
      <Checkbox label='Use Type as List' value={typeAsList} onChange={() => setTypeAsList(!typeAsList)} />
    </>
  );
};
