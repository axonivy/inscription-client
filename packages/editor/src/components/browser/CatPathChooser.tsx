import { useState } from 'react';
import { Input } from '../widgets/index.js';
import type { UseBrowserImplReturnValue } from './useBrowser.js';
export const CAT_PATH_CHOOSER_BROWSER_ID = 'catPath' as const;

export const useCatPathChooserBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('category path chooser');
  return {
    id: CAT_PATH_CHOOSER_BROWSER_ID,
    name: 'Category Path Chooser',
    content: <CatPathChooserBrowser value={value} onChange={setValue} />,
    accept: () => value
  };
};

const CatPathChooserBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  return <Input {...props} />;
};
