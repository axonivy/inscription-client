import './Browser.css';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Button, TabContent, TabList, TabRoot } from '../widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { useEditorContext } from '../../context';
import { useState } from 'react';
import { useAttributeBrowser } from './AttributeBrowser';
import { BrowserType, UseBrowserReturnValue } from './useBrowser';
import { useFuncBrowser } from './FunctionBrowser';
import { useDataTypeBrowser } from './DataTypeBrowser';
import { useTableColBrowser } from './TableColBrowser';
import { useSqlOpBrowser } from './SqlOperationBrowser';
import { useCatPathChooserBrowser } from './CatPathChooser';
import { CmsOptions, useCmsBrowser } from './CmsBrowser';

type BrowserProps = UseBrowserReturnValue & {
  types: BrowserType[];
  accept: (value: string, type: BrowserType) => void;
  location: string;
  cmsOptions?: CmsOptions;
};

const Browser = ({ open, onOpenChange, types, accept, location, cmsOptions }: BrowserProps) => {
  const { editorRef } = useEditorContext();
  const [active, setActive] = useState<BrowserType>(types[0]);

  const attrBrowser = useAttributeBrowser(location);
  const cmsBrowser = useCmsBrowser(cmsOptions);
  const funcBrowser = useFuncBrowser();
  const dataTypeBrowser = useDataTypeBrowser();
  const catPathChooserBrowser = useCatPathChooserBrowser();
  const tableColBrowser = useTableColBrowser();
  const sqlOpBrowser = useSqlOpBrowser();

  const allBrowsers = [attrBrowser, cmsBrowser, funcBrowser, dataTypeBrowser, catPathChooserBrowser, tableColBrowser, sqlOpBrowser];

  const tabs = allBrowsers.filter(browser => types.includes(browser.id));
  const acceptBrowser = () => {
    accept(allBrowsers.find(browser => browser.id === active)?.accept() ?? '', active);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button icon={IvyIcons.WsEvent} aria-label='Browser' />
        </DialogTrigger>
        <DialogPortal container={editorRef.current}>
          <DialogOverlay className='dialog-overlay' />
          <DialogContent className={`dialog-content ${!open ? 'dialog-content-exit' : ''}`}>
            <TabRoot tabs={tabs} value={active} onChange={change => setActive(change as BrowserType)}>
              <DialogTitle className='dialog-title'>
                <TabList tabs={tabs} />
                <DialogClose asChild>
                  <Button icon={IvyIcons.Add} rotate={45} aria-label='Close' />
                </DialogClose>
              </DialogTitle>

              <TabContent tabs={tabs} />
            </TabRoot>

            <div className='dialog-footer'>
              <DialogClose asChild>
                <Button icon={IvyIcons.Add} rotate={45} aria-label='Cancel'>
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button icon={IvyIcons.Add} aria-label='Insert' onClick={() => acceptBrowser()}>
                  Insert
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};

export default Browser;
