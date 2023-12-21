import { useState } from 'react';
import { Input } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
export const SQL_OPERATION_BROWSER_ID = 'sqlOp' as const;

export const useSqlOpBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: 'sql operation' });
  return {
    id: SQL_OPERATION_BROWSER_ID,
    name: 'SQL Operation',
    content: <SqlOperationBrowser value={value.cursorValue} onChange={(change: string) => setValue({ cursorValue: change })} />,
    accept: () => value,
    icon: IvyIcons.Task
  };
};

const SqlOperationBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  return <Input {...props} />;
};
