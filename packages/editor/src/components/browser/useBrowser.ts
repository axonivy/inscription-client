import { useState } from 'react';
import { ATTRIBUTE_BROWSER_ID } from './AttributeBrowser';
import { CMS_BROWSER_ID } from './CmsBrowser';
import { Tab } from '../widgets';

export type BrowserType = typeof ATTRIBUTE_BROWSER_ID | typeof CMS_BROWSER_ID;

export type UseBrowserImplReturnValue = Omit<Tab, 'id'> & {
  id: BrowserType;
  accept: () => string;
};

export type UseBrowserReturnValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const useBrowser = (): UseBrowserReturnValue => {
  const [open, setOpen] = useState(false);
  return { open, onOpenChange: setOpen };
};
