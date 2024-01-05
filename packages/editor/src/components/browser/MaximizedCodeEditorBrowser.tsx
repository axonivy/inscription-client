import { Dialog } from '@radix-ui/react-dialog';
import { type Tab } from '../widgets';
import { type BrowserType, type UseBrowserReturnValue } from './useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
import BrowserBody from './BrowserBody';
import MaximizedCodeEditor from './maximizedCodeEditor/MaximizedCodeEditor';

type MaximaziedCodeEditorBrowserProps = UseBrowserReturnValue & {
  editorValue: string;
  location: string;
  browsers: BrowserType[];
  applyEditor: (change: string) => void;
};

const MaximizedCodeEditorBrowser = ({
  open,
  onOpenChange,
  browsers,
  editorValue,
  applyEditor,
  location
}: MaximaziedCodeEditorBrowserProps) => {
  const tabs: Tab[] = [
    {
      content: <MaximizedCodeEditor applyEditor={applyEditor} browsers={browsers} editorValue={editorValue} location={location} />,
      id: 'maxCode',
      name: 'Code',
      icon: IvyIcons.StartProgram
    }
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <BrowserBody activeTab='maxCode' open={open} tabs={tabs} />
      </Dialog>
    </>
  );
};

export default MaximizedCodeEditorBrowser;
