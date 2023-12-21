import { useState } from 'react';
import { Input } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
import type { BrowserValue } from '../Browser';
export const CAT_PATH_CHOOSER_BROWSER_ID = 'catPath' as const;

export const useCatPathChooserBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: 'category path chooser' });
  return {
    id: CAT_PATH_CHOOSER_BROWSER_ID,
    name: 'Category Path Chooser',
    content: <CatPathChooserBrowser value={value.cursorValue} onChange={(change: string) => setValue({ cursorValue: change })} />,
    accept: () => value,
    icon: IvyIcons.Label
  };
};

const CatPathChooserBrowser = (props: { value: string; onChange: (value: string) => void }) => {
  return <Input {...props} />;
};
