import { useState } from 'react';
import { Input } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
export const TABLE_COL_BROWSER_ID = 'tablecol' as const;

export const useTableColBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: 'table column' });
  return {
    id: TABLE_COL_BROWSER_ID,
    name: 'Table Column',
    content: <TableColumnBrowser value={value.cursorValue} onChange={(change: string) => setValue({ cursorValue: change })} />,
    accept: () => value,
    icon: IvyIcons.Rule
  };
};

const TableColumnBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  return <Input {...props} />;
};
