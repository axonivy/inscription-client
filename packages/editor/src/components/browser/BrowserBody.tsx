import './BrowserBody.css';
import { DialogClose, DialogContent, DialogPortal, DialogTitle } from '@radix-ui/react-dialog';
import { Button, TabList, TabRoot, type Tab, TabContent } from '../widgets';
import { useEditorContext } from '../../context';

interface ReusableBrowserDialogProps {
  open: boolean;
  tabs: Tab[];
  activeTab: string;
  onTabsChange?: (change: string) => void;
  onApply?: () => void;
}

const BrowserBody = ({ open, tabs, activeTab, onTabsChange, onApply }: ReusableBrowserDialogProps) => {
  const { editorRef } = useEditorContext();

  return (
    <DialogPortal container={editorRef.current}>
      <DialogContent className={`browser-dialog ${!open ? 'browser-content-exit' : ''}`}>
        <div className='browser-content'>
          <TabRoot tabs={tabs} value={activeTab} onChange={onTabsChange}>
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
              <Button className='insert' aria-label='Apply' onClick={onApply}>
                Apply
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  );
};

export default BrowserBody;
