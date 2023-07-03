import { useState } from 'react';
import { Input } from '../widgets';
import { UseBrowserImplReturnValue } from './useBrowser';

export const CMS_BROWSER_ID = 'cms' as const;

export const useCmsBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('cms');

  return { id: CMS_BROWSER_ID, name: 'CMS', content: <CmsBrowser value={value} onChange={setValue} />, accept: () => value };
};

const CmsBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  return <Input {...props} />;
};
