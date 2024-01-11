import { useEffect, useMemo, useState } from 'react';
import { ExpandableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import type { Function, Parameter } from '@axonivy/inscription-protocol';
import { type ColumnDef, type Row } from '@tanstack/react-table';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import { useEditorContext, useMeta } from '../../../context';
import { getParentNames } from './parent-name';
import type { GenericData } from '../GenericBrowser';
import { GenericBrowser } from '../GenericBrowser';
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

export type HiddenFunctionInfo = { isField: boolean; params: Parameter[]; packageName: string };

const FunctionBrowser = (props: { value: string; onChange: (value: BrowserValue) => void; onDoubleClick: () => void }) => {
  const { context } = useEditorContext();
  const [method, setMethod] = useState('');
  const [paramTypes, setParamTypes] = useState<string[]>([]);
  const [type, setType] = useState('');
  const [mappedSortedData, setMappedSortedData] = useState<GenericData<HiddenFunctionInfo>[]>([]);
  const { data: tree } = useMeta('meta/scripting/functions', undefined, []);
  const { data: doc } = useMeta('meta/scripting/apiDoc', { context, method, paramTypes, type }, '');

  const [selectedFunctionDoc, setSelectedFunctionDoc] = useState('');

  useEffect(() => {
    const mapFunctionToGenericData = (func: Function): GenericData<HiddenFunctionInfo> => ({
      title: func.name,
      info: func.returnType.simpleName,
      hiddenInfo: { isField: func.isField, params: func.params, packageName: func.returnType.packageName },
      children: func.returnType.functions ? func.returnType.functions.map(mapFunctionToGenericData) : []
    });

    if (tree && tree.length > 0) {
      // Extracting and sorting functions inside root.returnType alphabetically
      const sortedReturnTypes = tree
        .map(entry => entry.returnType)
        .filter(returnType => returnType)
        .map(returnType => ({
          ...returnType,
          functions: returnType.functions.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }))
        }));

      const finalSortedData = tree.map((entry, index) => ({
        ...entry,
        returnType: sortedReturnTypes[index]
      }));

      // Replace the root.returnType from sortedData with the sortedReturnTypes
      const mappedFinalSortedData = finalSortedData.map(entry => ({
        title: entry.name,
        info: entry.returnType.simpleName,
        hiddenInfo: { isField: entry.isField, params: entry.params, packageName: entry.returnType.packageName },
        children: entry.returnType.functions.map(mapFunctionToGenericData)
      }));

      setMappedSortedData(mappedFinalSortedData);
    }
  }, [tree]);

  const columns = useMemo<ColumnDef<GenericData<HiddenFunctionInfo>>[]>(
    () => [
      {
        accessorFn: row =>
          `${row.title.split('.').pop()}${
            row.hiddenInfo?.isField === false ? `(${row.hiddenInfo.params.map(param => param.type.split('.').pop()).join(', ')})` : ''
          }`,
        id: 'name',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.title}
              icon={cell.row.original.hiddenInfo?.isField ? IvyIcons.FolderOpen : IvyIcons.Function}
              additionalInfo={cell.row.original.info}
            />
          );
        }
      }
    ],
    []
  );

  const handleRowSelectionChange = (selectedRow: Row<GenericData<HiddenFunctionInfo>> | undefined) => {
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
        ? parentRow.original.hiddenInfo?.packageName + '.' + parentRow.original.info
        : selectedRow.original.hiddenInfo?.packageName + '.' + selectedRow.original.info
    );
    setMethod(selectedRow.original.title);
    setParamTypes(selectedRow.original.hiddenInfo ? selectedRow.original.hiddenInfo.params.map(param => param.type) : []);
    //setup Helpertext
    setSelectedFunctionDoc(doc);
  };

  return (
    <>
      <GenericBrowser
        columns={columns}
        data={mappedSortedData}
        onDoubleClick={props.onDoubleClick}
        onRowSelectionChange={handleRowSelectionChange}
        value={props.value}
        additionalHelp={selectedFunctionDoc}
      />
    </>
  );
};
