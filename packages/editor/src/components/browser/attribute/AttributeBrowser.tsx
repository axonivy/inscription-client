import { useCallback, useEffect, useMemo, useState } from 'react';
import { ExpandableCell, ExpandableHeader } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import type { ColumnDef, Row } from '@tanstack/react-table';
import { MappingTreeData } from '../../parts/common/mapping-tree/mapping-tree-data';
import type { VariableInfo } from '@axonivy/inscription-protocol';
import { useEditorContext, useMeta } from '../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import type { GenericData } from '../GenericBrowser';
import { mapToGenericData } from '../transformData';

export const ATTRIBUTE_BROWSER_ID = 'attr' as const;

export const useAttributeBrowser = (location: string): UseBrowserImplReturnValue<MappingTreeData> => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });
  const [mappedSortedData, setMappedSortedData] = useState<GenericData<MappingTreeData>[]>([]);

  const [tree, setTree] = useState<MappingTreeData[]>([]);
  const [varInfo, setVarInfo] = useState<VariableInfo>({ variables: [], types: {} });

  const { elementContext: context } = useEditorContext();
  const { data: inVarInfo } = useMeta('meta/scripting/in', { context, location }, { variables: [], types: {} });
  const { data: outVarInfo } = useMeta('meta/scripting/out', { context, location }, { variables: [], types: {} });

  useEffect(() => {
    location.endsWith('code')
      ? setVarInfo({ variables: [...inVarInfo.variables, ...outVarInfo.variables], types: { ...inVarInfo.types, ...outVarInfo.types } })
      : setVarInfo(inVarInfo);
  }, [inVarInfo, outVarInfo, location]);

  useEffect(() => {
    setTree(MappingTreeData.of(varInfo));
    const mappedFinalSortedData = tree.map(entry => mapToGenericData(entry, 'children'));
    setMappedSortedData(mappedFinalSortedData);
  }, [tree, varInfo]);

  const loadChildren = useCallback<(row: MappingTreeData) => void>(
    row => setTree(tree => MappingTreeData.loadChildrenFor(varInfo, row.type, tree)),
    [varInfo]
  );

  const columns = useMemo<ColumnDef<GenericData<MappingTreeData>>[]>(
    () => [
      {
        accessorFn: row => row.data.attribute,
        id: 'attribute',
        header: header => <ExpandableHeader header={header} name='Attribute' />,
        cell: cell => (
          <ExpandableCell
            cell={cell}
            isLoaded={cell.row.original.data.isLoaded}
            loadChildren={() => loadChildren(cell.row.original.data)}
            title={cell.row.original.data.description}
            additionalInfo={cell.row.original.data.simpleType}
            icon={IvyIcons.Attribute}
          />
        )
      }
    ],
    [loadChildren]
  );

  const calcFullPathId = (row: Row<GenericData<MappingTreeData>>) => {
    return [...row.getParentRows().map(parent => parent.original.data.attribute), row.original.data.attribute].join('.');
  };

  const handleRowSelectionChange = (selectedRow: Row<GenericData<MappingTreeData>> | undefined) => {
    if (!selectedRow) {
      setValue({ cursorValue: '' });
      return;
    }
    setValue({ cursorValue: calcFullPathId(selectedRow) });
  };

  return {
    id: ATTRIBUTE_BROWSER_ID,
    icon: IvyIcons.Attribute,
    name: 'Attribute',

    content: {
      columns: columns,
      data: mappedSortedData,
      onRowSelectionChange: handleRowSelectionChange,
      options: {
        additionalComponents: {
          helperTextComponent: <code>{value.cursorValue}</code>
        }
      }
    },
    accept: () => value
  };
};
