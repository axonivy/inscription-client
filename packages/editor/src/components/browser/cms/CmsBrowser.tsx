import { useMemo, useEffect, useState } from 'react';
import { Button, Checkbox, ExpandableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import { useAction, useEditorContext, useMeta } from '../../../context';
import type { ColumnDef, Row } from '@tanstack/react-table';
import type { ContentObject, MapStringString } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import { GenericBrowser, type GenericData } from '../GenericBrowser';

export const CMS_BROWSER_ID = 'cms' as const;

export type CmsTypeFilter = 'STRING' | 'FILE' | 'NONE';

export type CmsOptions = {
  noApiCall?: boolean;
  typeFilter?: CmsTypeFilter;
};

export const useCmsBrowser = (onDoubleClick: () => void, location: string, options?: CmsOptions): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });

  return {
    id: CMS_BROWSER_ID,
    name: 'CMS',
    content: (
      <CmsBrowser
        value={value.cursorValue}
        onChange={setValue}
        noApiCall={options?.noApiCall}
        typeFilter={options?.typeFilter}
        onDoubleClick={onDoubleClick}
        location={location}
      />
    ),
    accept: () => value,
    icon: IvyIcons.Cms
  };
};

interface CmsBrowserProps {
  value: string;
  onChange: (value: BrowserValue) => void;
  noApiCall?: boolean;
  typeFilter?: CmsTypeFilter;
  onDoubleClick: () => void;
  location: string;
}

type HiddenCMSInfo = { fullPath: string; values: MapStringString };

const CmsBrowser = ({ value, onChange, noApiCall, typeFilter, onDoubleClick, location }: CmsBrowserProps) => {
  const { context } = useEditorContext();

  const [requiredProject, setRequiredProject] = useState<boolean>(false);
  const { data: tree, refetch } = useMeta('meta/cms/tree', { context, requiredProjects: requiredProject }, []);
  const [mappedSortedData, setMappedSortedData] = useState<GenericData<HiddenCMSInfo>[]>([]);

  const [selectedContentObject, setSelectedContentObject] = useState<GenericData<HiddenCMSInfo> | undefined>();

  const newAction = useAction('newCmsString');

  useEffect(() => {
    const mapContentObjectToGenericData = (cms: ContentObject): GenericData<HiddenCMSInfo> => ({
      title: cms.name,
      info: cms.type,
      hiddenInfo: { fullPath: cms.fullPath, values: cms.values },
      isNotSelectable: cms.type === 'FOLDER' ? true : false,
      specialAction:
        cms.type === 'FOLDER'
          ? [{ label: 'Create new CMS-String', icon: IvyIcons.Plus, action: () => newAction(cms.fullPath) }]
          : undefined,
      children: cms.children ? cms.children.map(mapContentObjectToGenericData) : []
    });

    if (tree && tree.length > 0) {
      // Replace the root.returnType from sortedData with the sortedReturnTypes
      const mappedFinalSortedData = tree.map(entry => ({
        title: entry.name,
        info: entry.type,
        hiddenInfo: { fullPath: entry.fullPath, values: entry.values },
        isNotSelectable: entry.type === 'FOLDER' ? true : false,
        specialAction:
          entry.type === 'FOLDER'
            ? [{ label: 'Create new CMS-String', icon: IvyIcons.Plus, action: () => newAction(entry.fullPath) }]
            : undefined,
        children: entry.children.map(mapContentObjectToGenericData)
      }));

      setMappedSortedData(mappedFinalSortedData);
    }
  }, [newAction, tree]);

  const columns = useMemo<ColumnDef<GenericData<HiddenCMSInfo>>[]>(
    () => [
      {
        accessorFn: row => row.title,
        id: 'name',
        cell: cell => {
          return (
            <ExpandableCell
              cell={cell}
              title={cell.row.original.title}
              icon={
                cell.row.original.info === 'FOLDER'
                  ? IvyIcons.FolderOpen
                  : cell.row.original.info === 'FILE'
                  ? IvyIcons.File
                  : IvyIcons.ChangeType
              }
              additionalInfo={cell.row.original.info}
            />
          );
        }
      },
      {
        accessorFn: row => row.info,
        id: 'type',
        cell: cell => <span title={cell.row.original.info}>{cell.getValue() as string}</span>
      },
      {
        accessorFn: row => JSON.stringify(row.hiddenInfo?.values),
        id: 'values',
        cell: cell => <span title={JSON.stringify(cell.row.original.hiddenInfo?.values)}>{JSON.stringify(cell.getValue())}</span>
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

  const handleRowSelectionChange = (selectedRow: Row<GenericData<HiddenCMSInfo>> | undefined) => {
    if (!selectedRow) {
      setSelectedContentObject({ title: '', children: [], hiddenInfo: { fullPath: '', values: {} }, info: 'STRING' });
      onChange({ cursorValue: '' });
      return;
    }
    setSelectedContentObject(selectedRow.original);
    onChange({ cursorValue: addIvyPathToValue(selectedRow.original.hiddenInfo.fullPath, selectedRow.original.info, noApiCall) });
  };

  return (
    <>
      <div className='browser-table-header'>
        <Checkbox label='Enable required Projects' value={requiredProject} onChange={() => setRequiredProject(!requiredProject)} />
        <Button onClick={() => refetch()} title='Refresh CMS-Browser' aria-label='refresh' icon={IvyIcons.Redo} />
      </div>
      <GenericBrowser
        columns={columns}
        data={mappedSortedData}
        onDoubleClick={onDoubleClick}
        onRowSelectionChange={handleRowSelectionChange}
        value={value}
        additionalHelp={selectedContentObject?.hiddenInfo.values}
        customColumnFilters={typeFilter === 'NONE' || typeFilter === undefined ? [] : [{ id: 'type', value: typeFilter }]}
        hiddenRows={{ type: false, values: false }}
      />
    </>
  );
};
