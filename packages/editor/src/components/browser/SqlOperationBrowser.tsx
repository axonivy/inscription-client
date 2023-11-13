import { useState } from 'react';
import { Input } from '../widgets';
import type { UseBrowserImplReturnValue } from './useBrowser';
export const SQL_OPERATION_BROWSER_ID = 'sqlOp' as const;

export const useSqlOpBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('sql operation');
  return {
    id: SQL_OPERATION_BROWSER_ID,
    name: 'SQL Operation',
    content: <SqlOperationBrowser value={value} onChange={setValue} />,
    accept: () => value
  };
};

const SqlOperationBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  return <Input {...props} />;
};
