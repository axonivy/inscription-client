import { useState } from 'react';
import type { Tab } from '../widgets';
import type { IvyIcons } from '@axonivy/editor-icons';
import type { ATTRIBUTE_BROWSER_ID } from './attribute/AttributeBrowser';
import type { CMS_BROWSER_ID } from './cms/CmsBrowser';
import type { FUNCTION_BROWSER_ID } from './function/FunctionBrowser';
import type { TYPE_BROWSER_ID } from './type/TypeBrowser';
import type { CAT_PATH_CHOOSER_BROWSER_ID } from './categorie/CatPathChooser';
import type { TABLE_COL_BROWSER_ID } from './tableCol/TableColBrowser';
import type { SQL_OPERATION_BROWSER_ID } from './sql/SqlOperationBrowser';

export type BrowserType =
  | typeof ATTRIBUTE_BROWSER_ID
  | typeof CMS_BROWSER_ID
  | typeof FUNCTION_BROWSER_ID
  | typeof TYPE_BROWSER_ID
  | typeof CAT_PATH_CHOOSER_BROWSER_ID
  | typeof TABLE_COL_BROWSER_ID
  | typeof SQL_OPERATION_BROWSER_ID;

type BrowserValue = { cursorValue: string; firstLineValue?: string };

export type UseBrowserImplReturnValue = Omit<Tab, 'id'> & {
  id: BrowserType;
  accept: () => BrowserValue;
  icon: IvyIcons;
};

export type UseBrowserReturnValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const useBrowser = (): UseBrowserReturnValue => {
  const [open, setOpen] = useState(false);
  return { open, onOpenChange: setOpen };
};
