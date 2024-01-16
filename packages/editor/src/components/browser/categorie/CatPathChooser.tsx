import { useMemo, useState } from 'react';
import { ExpandableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import type { GenericData } from '../GenericBrowser';
import type { ColumnDef } from '@tanstack/react-table';
export const CAT_PATH_CHOOSER_BROWSER_ID = 'catPath' as const;

export const useCatPathChooserBrowser = (): UseBrowserImplReturnValue<{ title: string }> => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: 'category path chooser' });

  const columns = useMemo<ColumnDef<GenericData<{ title: string }>>[]>(
    () => [
      {
        accessorFn: row => row.data,
        id: 'name',
        cell: cell => {
          return <ExpandableCell cell={cell} title={cell.row.original.data.title} />;
        }
      }
    ],
    []
  );

  return {
    id: CAT_PATH_CHOOSER_BROWSER_ID,
    name: 'Category Path Chooser',
    content: {
      columns: columns,
      data: [{ data: { title: 'Not yet implemented' }, children: [], isNotSelectable: true }],
      onRowSelectionChange: () => {
        setValue({ cursorValue: '' });
      }
    },
    accept: () => value,
    icon: IvyIcons.Label
  };
};
