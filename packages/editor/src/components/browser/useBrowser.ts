import { useState } from 'react';
import type { ATTRIBUTE_BROWSER_ID } from './AttributeBrowser.js';
import type { CMS_BROWSER_ID } from './CmsBrowser.js';
import type { Tab } from '../widgets/index.js';
import type { FUNCTION_BROWSER_ID } from './FunctionBrowser.js';
import type { TYPE_BROWSER_ID } from './TypeBrowser.js';
import type { TABLE_COL_BROWSER_ID } from './TableColBrowser.js';
import type { SQL_OPERATION_BROWSER_ID } from './SqlOperationBrowser.js';
import type { CAT_PATH_CHOOSER_BROWSER_ID } from './CatPathChooser.js';

export type BrowserType =
  | typeof ATTRIBUTE_BROWSER_ID
  | typeof CMS_BROWSER_ID
  | typeof FUNCTION_BROWSER_ID
  | typeof TYPE_BROWSER_ID
  | typeof CAT_PATH_CHOOSER_BROWSER_ID
  | typeof TABLE_COL_BROWSER_ID
  | typeof SQL_OPERATION_BROWSER_ID;

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
