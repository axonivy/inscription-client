import { useState } from 'react';
import { Input } from '../widgets';
import type { UseBrowserImplReturnValue } from './useBrowser';
export const TABLE_COL_BROWSER_ID = 'tablecol' as const;

export const useTableColBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('table column');
  return {
    id: TABLE_COL_BROWSER_ID,
    name: 'Table Column',
    content: <TableColumnBrowser value={value} onChange={setValue} />,
    accept: () => value
  };
};

const TableColumnBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  return <Input {...props} />;
};
