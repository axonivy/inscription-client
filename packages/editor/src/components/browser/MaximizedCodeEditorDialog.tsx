import { Dialog } from '@radix-ui/react-dialog';
import { type Tab } from '../widgets';
import { type UseBrowserReturnValue } from './useBrowser';
import { IvyIcons } from '@axonivy/editor-icons';
import MaximizedCodeEditor, { type MaximizedCodeEditorProps } from './maximizedCodeEditor/MaximizedCodeEditor';
import BrowserBody from './BrowserBody';

type MaximaziedCodeEditorDialogProps = UseBrowserReturnValue & MaximizedCodeEditorProps;

const MaximizedCodeEditorDialog = ({
  open,
  onOpenChange,
  browsers,
  editorValue,
  applyEditor,
  location,
  selectionRange
}: MaximaziedCodeEditorDialogProps) => {
  const tabs: Tab[] = [
    {
      content: (
        <MaximizedCodeEditor
          applyEditor={applyEditor}
          browsers={browsers}
          editorValue={editorValue}
          location={location}
          selectionRange={selectionRange}
          open={open}
          keyActions={{
            escape: () => {
              onOpenChange(false);
            }
          }}
        />
      ),
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

export default MaximizedCodeEditorDialog;
