import { useState } from 'react';
import { ATTRIBUTE_BROWSER_ID } from './AttributeBrowser';
import { CMS_BROWSER_ID } from './CmsBrowser';
import { Tab } from '../widgets';
import { FUNCTION_BROWSER_ID } from './FunctionBrowser';
import { DATATYPE_BROWSER_ID } from './DataTypeBrowser';
import { TABLE_COL_BROWSER_ID } from './TableColBrowser';
import { SQL_OPERATION_BROWSER_ID } from './SqlOperationBrowser';
import { CAT_PATH_CHOOSER_BROWSER_ID } from './CatPathChooser';

export type BrowserType =
  | typeof ATTRIBUTE_BROWSER_ID
  | typeof CMS_BROWSER_ID
  | typeof FUNCTION_BROWSER_ID
  | typeof DATATYPE_BROWSER_ID
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
