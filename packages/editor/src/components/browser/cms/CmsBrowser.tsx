import { useMemo, useEffect, useState } from 'react';
import { Button, Checkbox, ExpandableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import { useAction, useEditorContext, useMeta } from '../../../context';
import type { ColumnDef, Row } from '@tanstack/react-table';
import type { ContentObject } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import { type GenericData } from '../GenericBrowser';
import { mapToGenericData } from '../transformData';

export const CMS_BROWSER_ID = 'cms' as const;

export type CmsTypeFilter = 'STRING' | 'FILE' | 'NONE';

export type CmsOptions = {
  noApiCall?: boolean;
  typeFilter?: CmsTypeFilter;
};

export const useCmsBrowser = (location: string, options?: CmsOptions): UseBrowserImplReturnValue<ContentObject> => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });

  const { context } = useEditorContext();

  const [requiredProject, setRequiredProject] = useState<boolean>(false);
  const { data: tree, isFetching, refetch } = useMeta('meta/cms/tree', { context, requiredProjects: requiredProject }, []);
  const [mappedSortedData, setMappedSortedData] = useState<GenericData<ContentObject>[]>([]);

  const [selectedContentObject, setSelectedContentObject] = useState<GenericData<ContentObject> | undefined>();

  const newAction = useAction('newCmsString');

  useEffect(() => {
    if (tree && tree.length > 0) {
      // Replace the root.returnType from sortedData with the sortedReturnTypes
      const mappedFinalSortedData = tree.map(entry =>
        mapToGenericData(
          entry,
          'children',
          entry => entry.type === 'FOLDER',
          entry =>
            entry.type === 'FOLDER'
              ? [{ label: 'Create new CMS-String', icon: IvyIcons.Plus, action: () => newAction(entry.fullPath) }]
              : []
        )
      );

      setMappedSortedData(mappedFinalSortedData);
    }
  }, [newAction, tree]);

  const columns = useMemo<ColumnDef<GenericData<ContentObject>>[]>(
    () => [
      {
        accessorFn: row => row.browserObject.name,
        id: 'name',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.browserObject.name}
              icon={
                cell.row.original.browserObject.type === 'FOLDER'
                  ? IvyIcons.FolderOpen
                  : cell.row.original.browserObject.type === 'FILE'
                  ? IvyIcons.File
                  : IvyIcons.ChangeType
              }
              additionalInfo={cell.row.original.browserObject.type}
            />
          );
        }
      },
      {
        accessorFn: row => row.browserObject.type,
        id: 'type',
        cell: cell => <span title={cell.row.original.browserObject.type}>{cell.getValue() as string}</span>
      },
      {
        accessorFn: row => JSON.stringify(row.browserObject.values),
        id: 'values',
        cell: cell => <span title={JSON.stringify(cell.row.original.browserObject.values)}>{JSON.stringify(cell.getValue())}</span>
      }
    ],
    []
  );

  const addIvyPathToValue = (value: string, type: string, noApiCall?: boolean) => {
    if (noApiCall || value.length === 0) {
      return value;
    }
    if (type === 'FILE' && location === 'attachments') {
      return `ivy.cm.findObject("${value}")`;
    } else if (type === 'FILE' && location !== 'message') {
      return `ivy.cms.cr("${value}")`;
    }
    return `ivy.cms.co("${value}")`;
  };

  const handleRowSelectionChange = (selectedRow: Row<GenericData<ContentObject>> | undefined) => {
    if (!selectedRow) {
      setSelectedContentObject({ browserObject: { name: '', children: [], fullPath: '', type: 'STRING', values: {} }, children: [] });
      setValue({ cursorValue: '' });
      return;
    }
    setSelectedContentObject(selectedRow.original);
    setValue({
      cursorValue: addIvyPathToValue(
        selectedRow.original.browserObject.fullPath,
        selectedRow.original.browserObject.type,
        options?.noApiCall
      )
    });
  };

  return {
    id: CMS_BROWSER_ID,
    name: 'CMS',
    content: {
      columns: columns,
      data: mappedSortedData,
      onRowSelectionChange: handleRowSelectionChange,
      customColumnFilters:
        options?.typeFilter === 'NONE' || options?.typeFilter === undefined ? [] : [{ id: 'type', value: options?.typeFilter }],
      hiddenRows: { type: false, values: false },
      isFetching: isFetching,
      additionalComponents: {
        helperTextComponent: (
          <>
            <b>{value.cursorValue}</b>
            <code>
              {selectedContentObject?.browserObject.values &&
                Object.entries(selectedContentObject?.browserObject.values).map(([key, value]) => (
                  <div key={key}>
                    <b>{`${key}: `}</b>
                    {value}
                  </div>
                ))}
            </code>
          </>
        ),
        headerComponent: (
          <div className='browser-table-header'>
            <Checkbox label='Enable required Projects' value={requiredProject} onChange={() => setRequiredProject(!requiredProject)} />
            <Button onClick={() => refetch()} title='Refresh CMS-Browser' aria-label='refresh' icon={IvyIcons.Redo} />
          </div>
        )
      }
    },
    accept: () => value,
    icon: IvyIcons.Cms
  };
};
