import './Browser.css';
import { Dialog, DialogClose, DialogContent, DialogPortal, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Button, TabContent, TabList, TabRoot } from '../widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { useEditorContext } from '../../context';
import { useState } from 'react';
import { useAttributeBrowser } from './AttributeBrowser';
import type { BrowserType, UseBrowserReturnValue } from './useBrowser';
import { useFuncBrowser } from './FunctionBrowser';
import { useTypeBrowser } from './TypeBrowser';
import { useTableColBrowser } from './TableColBrowser';
import { useSqlOpBrowser } from './SqlOperationBrowser';
import { useCatPathChooserBrowser } from './CatPathChooser';
import type { CmsOptions } from './CmsBrowser';
import { useCmsBrowser } from './CmsBrowser';

type BrowserProps = UseBrowserReturnValue & {
  types: BrowserType[];
  accept: (value: string, type: BrowserType) => void;
  location: string;
  cmsOptions?: CmsOptions;
};

const Browser = ({ open, onOpenChange, types, accept, location, cmsOptions }: BrowserProps) => {
  const { editorRef } = useEditorContext();
  const [active, setActive] = useState<BrowserType>(types[0]);

  const acceptBrowser = () => {
    accept(allBrowsers.find(browser => browser.id === active)?.accept() ?? '', active);
  };

  const onRowDoubleClick = () => {
    onOpenChange(false);
    acceptBrowser();
  };

  const attrBrowser = useAttributeBrowser(onRowDoubleClick, location);
  const cmsBrowser = useCmsBrowser(onRowDoubleClick, cmsOptions);
  const funcBrowser = useFuncBrowser();
  const typeBrowser = useTypeBrowser(onRowDoubleClick);
  const catPathChooserBrowser = useCatPathChooserBrowser();
  const tableColBrowser = useTableColBrowser();
  const sqlOpBrowser = useSqlOpBrowser();

  const allBrowsers = [attrBrowser, cmsBrowser, funcBrowser, typeBrowser, catPathChooserBrowser, tableColBrowser, sqlOpBrowser];

  const tabs = allBrowsers.filter(browser => types.includes(browser.id));

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button icon={IvyIcons.WsEvent} aria-label='Browser' />
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
