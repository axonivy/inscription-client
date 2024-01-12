import { useEffect, useMemo, useState } from 'react';
import { ExpandableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import type { Function, PublicType } from '@axonivy/inscription-protocol';
import { type ColumnDef, type Row } from '@tanstack/react-table';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import { useEditorContext, useMeta } from '../../../context';
import { getParentNames } from './parent-name';
import type { GenericData } from '../GenericBrowser';
import { GenericBrowser } from '../GenericBrowser';
import { mapToGenericData, mapToUpdatedFunction } from '../transformData';
export const FUNCTION_BROWSER_ID = 'func' as const;

export const useFuncBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });
  return {
    id: FUNCTION_BROWSER_ID,
    name: 'Function',
    content: <FunctionBrowser value={value.cursorValue} onChange={setValue} />,
    accept: () => value,
    icon: IvyIcons.Function
  };
};

export type UpdatedFunction = Omit<Function, 'returnType'> & { returnType: Omit<PublicType, 'functions'>; functions: UpdatedFunction[] };

const FunctionBrowser = (props: { value: string; onChange: (value: BrowserValue) => void }) => {
  const { context } = useEditorContext();
  const [method, setMethod] = useState('');
  const [paramTypes, setParamTypes] = useState<string[]>([]);
  const [type, setType] = useState('');
  const [mappedSortedData, setMappedSortedData] = useState<GenericData<UpdatedFunction>[]>([]);
  const { data: tree, isFetching } = useMeta('meta/scripting/functions', undefined, []);
  const { data: doc } = useMeta('meta/scripting/apiDoc', { context, method, paramTypes, type }, '');

  const [selectedFunctionDoc, setSelectedFunctionDoc] = useState('');

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

      const finalSortedData: Function[] = tree.map((entry, index) => ({
        ...entry,
        returnType: sortedReturnTypes[index]
      }));
      //map correctly for genericBrowser
      const mappedFinalSortedDataToUpdatedFunction: UpdatedFunction[] = finalSortedData.map(func => {
        return mapToUpdatedFunction(func);
      });
      const mappedFinalSortedData = mappedFinalSortedDataToUpdatedFunction.map(entry => mapToGenericData(entry, 'functions'));
      setMappedSortedData(mappedFinalSortedData);
    }
  }, [tree]);

  const columns = useMemo<ColumnDef<GenericData<UpdatedFunction>>[]>(
    () => [
      {
        accessorFn: row =>
          `${row.browserObject.name.split('.').pop()}${
            row.browserObject.isField === false ? `(${row.browserObject.params.map(param => param.type.split('.').pop()).join(', ')})` : ''
          }`,
        id: 'name',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.browserObject.name}
              icon={cell.row.original.browserObject.isField ? IvyIcons.FolderOpen : IvyIcons.Function}
              additionalInfo={cell.row.original.browserObject.returnType.simpleName}
            />
          );
        }
      }
    ],
    []
  );

  const handleRowSelectionChange = (selectedRow: Row<GenericData<UpdatedFunction>> | undefined) => {
    if (!selectedRow) {
      props.onChange({ cursorValue: '' });
      return;
    }
    const parentNames = getParentNames(selectedRow);
    const selectedName = parentNames.reverse().join('.');
    props.onChange({ cursorValue: selectedName });

    //setup Meta-Call for docApi
    const parentRow = selectedRow.getParentRow();
    setType(
      parentRow
        ? parentRow.original.browserObject.returnType.packageName + '.' + parentRow.original.browserObject.returnType.simpleName
        : selectedRow.original.browserObject.returnType.packageName + '.' + selectedRow.original.browserObject.returnType.simpleName
    );
    setMethod(selectedRow.original.browserObject.name);
    setParamTypes(selectedRow.original.browserObject.params ? selectedRow.original.browserObject.params.map(param => param.type) : []);
    //setup Helpertext
    setSelectedFunctionDoc(doc);
  };

  return (
    <GenericBrowser
      columns={columns}
      data={mappedSortedData}
      onRowSelectionChange={handleRowSelectionChange}
      value={props.value}
      additionalHelp={selectedFunctionDoc}
      isFetching={isFetching}
    />
  );
};
