import './Browser.css';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Button, TabContent, TabList, TabRoot } from '../widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { useEditorContext } from '../../context';
import { useState } from 'react';
import { useAttributeBrowser } from './AttributeBrowser';
import { useCmsBrowser } from './CmsBrowser';
import { BrowserType, UseBrowserReturnValue } from './useBrowser';

type BrowserProps = UseBrowserReturnValue & {
  types: BrowserType[];
  accept: (value: string) => void;
  location: string;
};

const Browser = ({ open, onOpenChange, types, accept, location }: BrowserProps) => {
  const { editorRef } = useEditorContext();
  const [active, setActive] = useState<BrowserType>(types[0]);

  const attrBrowser = useAttributeBrowser(location);
  const cmsBrowser = useCmsBrowser();
  const allBrowsers = [attrBrowser, cmsBrowser];

  const tabs = allBrowsers.filter(browser => types.includes(browser.id));
  const acceptBrowser = () => accept(allBrowsers.find(browser => browser.id === active)?.accept() ?? '');

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button icon={IvyIcons.WsEvent} aria-label='Browser' />
        </DialogTrigger>
        <DialogPortal container={editorRef.current}>
          <DialogOverlay className='dialog-overlay' />
          <DialogContent className='dialog-content'>
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
