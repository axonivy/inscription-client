import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { IvyIcons } from '@axonivy/ui-icons';
import { useState } from 'react';
import type { BrowserType, UseBrowserReturnValue } from './useBrowser';
import { useAttributeBrowser } from './attribute/AttributeBrowser';
import { useCmsBrowser, type CmsOptions } from './cms/CmsBrowser';
import { useFuncBrowser } from './function/FunctionBrowser';
import { useTypeBrowser } from './type/TypeBrowser';
import { useTableColBrowser } from './tableCol/TableColBrowser';
import BrowserBody from './BrowserBody';
import { useRoleBrowser, type RoleOptions } from './role/RoleBrowser';
import { Button } from '@axonivy/ui-components';

export type BrowserValue = { cursorValue: string; firstLineValue?: string };

type BrowserProps = UseBrowserReturnValue & {
  types: BrowserType[];
  accept: (value: BrowserValue, type: BrowserType) => void;
  location: string;
  cmsOptions?: CmsOptions;
  roleOptions?: RoleOptions;
  initSearchFilter?: () => string;
};

const Browser = ({ open, onOpenChange, types, accept, location, cmsOptions, roleOptions, initSearchFilter }: BrowserProps) => {
  const [active, setActive] = useState<BrowserType>(types[0]);

  const acceptBrowser = () => {
    accept(allBrowsers.find(browser => browser.id === active)?.accept() ?? { cursorValue: '' }, active);
  };

  const onRowDoubleClick = () => {
    onOpenChange(false);
    acceptBrowser();
  };

  const attrBrowser = useAttributeBrowser(onRowDoubleClick, location);
  const cmsBrowser = useCmsBrowser(onRowDoubleClick, location, cmsOptions);
  const funcBrowser = useFuncBrowser(onRowDoubleClick);
  const typeBrowser = useTypeBrowser(
    onRowDoubleClick,
    initSearchFilter
      ? initSearchFilter
      : () => {
          return '';
        },
    location
  );
  const tableColBrowser = useTableColBrowser(onRowDoubleClick);
  const roleBrowser = useRoleBrowser(onRowDoubleClick, roleOptions);

  const allBrowsers = [attrBrowser, cmsBrowser, funcBrowser, typeBrowser, tableColBrowser, roleBrowser];

  const tabs = allBrowsers.filter(browser => types.includes(browser.id));

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
        <DialogTrigger asChild>
          <Button icon={IvyIcons.ListSearch} aria-label='Browser' />
        </DialogTrigger>
        <BrowserBody
          activeTab={active}
          onTabsChange={change => setActive(change as BrowserType)}
          onApply={() => acceptBrowser()}
          open={open}
          tabs={tabs}
        />
      </Dialog>
    </>
  );
};

export default Browser;
