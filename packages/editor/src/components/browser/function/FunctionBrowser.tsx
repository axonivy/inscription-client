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
import { mapToGenericData, mapToUpdatedFunction } from '../transformData';
export const FUNCTION_BROWSER_ID = 'func' as const;

export type UpdatedFunction = Omit<Function, 'returnType'> & { returnType: Omit<PublicType, 'functions'>; functions: UpdatedFunction[] };

export const useFuncBrowser = (): UseBrowserImplReturnValue<UpdatedFunction> => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });

  const { context } = useEditorContext();
  const [method, setMethod] = useState('');
  const [paramTypes, setParamTypes] = useState<string[]>([]);
  const [type, setType] = useState('');
  const [mappedSortedData, setMappedSortedData] = useState<GenericData<UpdatedFunction>[]>([]);
  const { data: tree, isFetching: funcIsFetching } = useMeta('meta/scripting/functions', undefined, []);
  const { data: doc, isFetching: docIsFetching } = useMeta('meta/scripting/apiDoc', { context, method, paramTypes, type }, '');

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
          `${row.data.name.split('.').pop()}${
            row.data.isField === false ? `(${row.data.params.map(param => param.type.split('.').pop()).join(', ')})` : ''
          }`,
        id: 'name',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.data.name}
              icon={cell.row.original.data.isField ? IvyIcons.FolderOpen : IvyIcons.Function}
              additionalInfo={cell.row.original.data.returnType.simpleName}
            />
          );
        }
      }
    ],
    []
  );

  const handleRowSelectionChange = (selectedRow: Row<GenericData<UpdatedFunction>> | undefined) => {
    if (!selectedRow) {
      setValue({ cursorValue: '' });
      return;
    }
    const parentNames = getParentNames(selectedRow);
    const selectedName = parentNames.reverse().join('.');
    setValue({ cursorValue: selectedName });

    //setup Meta-Call for docApi
    const parentRow = selectedRow.getParentRow();
    setType(
      parentRow
        ? parentRow.original.data.returnType.packageName + '.' + parentRow.original.data.returnType.simpleName
        : selectedRow.original.data.returnType.packageName + '.' + selectedRow.original.data.returnType.simpleName
    );
    setMethod(selectedRow.original.data.name);
    setParamTypes(selectedRow.original.data.params ? selectedRow.original.data.params.map(param => param.type) : []);
    //setup Helpertext
    setSelectedFunctionDoc(doc);
  };

  return {
    id: FUNCTION_BROWSER_ID,
    name: 'Function',
    content: {
      columns: columns,
      data: mappedSortedData,
      onRowSelectionChange: handleRowSelectionChange,
      options: {
        isFetching: funcIsFetching,
        additionalComponents: {
          helperTextComponent: (
            <>
              <b>{value.cursorValue}</b>
              {docIsFetching ? (
                <span>Java Documentation is loading...</span>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: selectedFunctionDoc }} />
              )}
            </>
          )
        }
      }
    },

    accept: () => value,
    icon: IvyIcons.Function
  };
};
