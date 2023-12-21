import './Browser.css';
import { Dialog, DialogClose, DialogContent, DialogPortal, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Button, TabContent, TabList, TabRoot } from '../widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { useEditorContext } from '../../context';
import { useState } from 'react';
import type { BrowserType, UseBrowserReturnValue } from './useBrowser';
import { useAttributeBrowser } from './attribute/AttributeBrowser';
import { useCmsBrowser, type CmsOptions } from './cms/CmsBrowser';
import { useFuncBrowser } from './function/FunctionBrowser';
import { useTypeBrowser } from './type/TypeBrowser';
import { useCatPathChooserBrowser } from './categorie/CatPathChooser';
import { useTableColBrowser } from './tableCol/TableColBrowser';
import { useSqlOpBrowser } from './sql/SqlOperationBrowser';

export type BrowserValue = { cursorValue: string; firstLineValue?: string };

type BrowserProps = UseBrowserReturnValue & {
  types: BrowserType[];
  accept: (value: BrowserValue, type: BrowserType) => void;
  location: string;
  cmsOptions?: CmsOptions;
  initSearchFilter?: () => string;
};

const Browser = ({ open, onOpenChange, types, accept, location, cmsOptions, initSearchFilter }: BrowserProps) => {
  const { editorRef } = useEditorContext();
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
  const catPathChooserBrowser = useCatPathChooserBrowser();
  const tableColBrowser = useTableColBrowser();
  const sqlOpBrowser = useSqlOpBrowser();

  const allBrowsers = [attrBrowser, cmsBrowser, funcBrowser, typeBrowser, catPathChooserBrowser, tableColBrowser, sqlOpBrowser];

  const tabs = allBrowsers.filter(browser => types.includes(browser.id));

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button icon={IvyIcons.ListSearch} aria-label='Browser' />
        </DialogTrigger>
        <DialogPortal container={editorRef.current}>
          <DialogContent className={`browser-dialog ${!open ? 'browser-content-exit' : ''}`}>
            <div className='browser-content'>
              <TabRoot tabs={tabs} value={active} onChange={change => setActive(change as BrowserType)}>
                <DialogTitle className='browser-title'>
                  <TabList tabs={tabs} />
                </DialogTitle>

                <TabContent tabs={tabs} />
              </TabRoot>
              <div className='browser-footer'>
                <DialogClose asChild>
                  <Button aria-label='Cancel'>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className='insert' aria-label='Apply' onClick={() => acceptBrowser()}>
                    Apply
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};

export default Browser;
