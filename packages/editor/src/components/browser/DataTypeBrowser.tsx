import { useState } from 'react';
import { Input } from '../widgets';
import { UseBrowserImplReturnValue } from './useBrowser';
export const DATATYPE_BROWSER_ID = 'datatype' as const;

export const useDataTypeBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('datatype');
  return { id: DATATYPE_BROWSER_ID, name: 'Datatype', content: <DataTypeBrowser value={value} onChange={setValue} />, accept: () => value };
};

const DataTypeBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  return <Input {...props} />;
};
