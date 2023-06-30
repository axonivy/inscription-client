import './Browser.css';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Button, Tabs } from '../widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { useEditorContext } from '../../context';
import { useState } from 'react';

export type BrowserType = 'attribute' | 'cms' | 'function';

type UseBrowserReturnValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type BrowserProps = UseBrowserReturnValue & {
  types: BrowserType[];
  accept: (value: string) => void;
};

export const useBrowser = (): UseBrowserReturnValue => {
  const [open, setOpen] = useState(false);
  return { open, onOpenChange: setOpen };
};

const Browser = ({ open, onOpenChange, types, accept }: BrowserProps) => {
  const { editorRef } = useEditorContext();
  const [active, setActive] = useState<BrowserType>(types[0]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button icon={IvyIcons.WsEvent} />
        </DialogTrigger>
        <DialogPortal container={editorRef.current}>
          <DialogOverlay className='dialog-overlay' />
          <DialogContent className='dialog-content'>
            <DialogTitle className='dialog-title'>
              Browser
              <DialogClose asChild>
                <Button icon={IvyIcons.Add} rotate={45} aria-label='Close' />
              </DialogClose>
            </DialogTitle>

            <Tabs
              tabs={[
                { name: 'attribute', content: <p>Attributes</p> },
                { name: 'cms', content: <p>CMS</p> }
              ]}
              value={active}
              onChange={change => setActive(change as BrowserType)}
            />

            <DialogClose asChild>
              <button className='button' onClick={() => accept(active)}>
                Ok
              </button>
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};

export default Browser;
