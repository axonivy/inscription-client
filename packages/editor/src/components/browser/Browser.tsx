import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Button, type Tab } from '../widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { useState } from 'react';
import { type BrowserType, type UseBrowserReturnValue } from './useBrowser';
import { useAttributeBrowser } from './attribute/AttributeBrowser';
import { useCmsBrowser, type CmsOptions } from './cms/CmsBrowser';
import { useFuncBrowser } from './function/FunctionBrowser';
import { useTypeBrowser } from './type/TypeBrowser';
import { useCatPathChooserBrowser } from './categorie/CatPathChooser';
import { useTableColBrowser } from './tableCol/TableColBrowser';
import { useSqlOpBrowser } from './sql/SqlOperationBrowser';
import { GenericBrowser } from './GenericBrowser';
import BrowserBody from './BrowserBody';

export type BrowserValue = { cursorValue: string; firstLineValue?: string };

type BrowserProps = UseBrowserReturnValue & {
  types: BrowserType[];
  accept: (value: BrowserValue, type: BrowserType) => void;
  location: string;
  cmsOptions?: CmsOptions;
  initSearchFilter?: () => string;
};

const Browser = ({ open, onOpenChange, types, accept, location, cmsOptions, initSearchFilter }: BrowserProps) => {
  const [active, setActive] = useState<BrowserType>(types[0]);

  const acceptBrowser = () => {
    accept(allBrowsers.find(browser => browser.id === active)?.accept() ?? { cursorValue: '' }, active);
  };

  const onRowDoubleClick = () => {
    onOpenChange(false);
    acceptBrowser();
  };

  const attrBrowser = useAttributeBrowser(location);
  const cmsBrowser = useCmsBrowser(location, cmsOptions);
  const funcBrowser = useFuncBrowser();
  const typeBrowser = useTypeBrowser(location);
  const catPathChooserBrowser = useCatPathChooserBrowser();
  const tableColBrowser = useTableColBrowser();
  const sqlOpBrowser = useSqlOpBrowser();

  const allBrowsers = [attrBrowser, cmsBrowser, funcBrowser, typeBrowser, catPathChooserBrowser, tableColBrowser, sqlOpBrowser];

  const tabs: Tab[] = allBrowsers
    .filter(browser => types.includes(browser.id))
    .map(browser => ({
      ...browser,
      content: (
        <GenericBrowser
          options={{
            initSearchValue: initSearchFilter ? initSearchFilter() : '',
            onRowDoubleClick: onRowDoubleClick,
            ...browser.content.options
          }}
          {...browser.content}
        />
      )
    }));

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
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
