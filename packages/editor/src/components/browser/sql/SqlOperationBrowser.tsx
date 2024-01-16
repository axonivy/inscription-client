import { useMemo, useState } from 'react';
import { ExpandableCell } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
import type { GenericData } from '../GenericBrowser';
import type { ColumnDef } from '@tanstack/react-table';
export const SQL_OPERATION_BROWSER_ID = 'sqlOp' as const;

export const useSqlOpBrowser = (): UseBrowserImplReturnValue<{ title: string }> => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: 'sql operation' });

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
    id: SQL_OPERATION_BROWSER_ID,
    name: 'SQL Operation',
    content: {
      columns: columns,
      data: [{ data: { title: 'Not yet implemented' }, children: [], isNotSelectable: true }],
      onRowSelectionChange: () => {
        setValue({ cursorValue: '' });
      }
    },
    accept: () => value,
    icon: IvyIcons.Task
  };
};
