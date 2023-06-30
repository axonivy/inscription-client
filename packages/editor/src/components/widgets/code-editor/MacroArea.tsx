import './ScriptArea.css';
import { Browser, useBrowser } from '../../../components/browser';
import { Textarea } from '../input';
import ResizableCodeEditor, { CodeEditorAreaProps } from './ResizableCodeEditor';
import { monacoAutoFocus, useCodeEditorOnFocus, useModifyEditor } from './useCodeEditor';

const MacroArea = (props: CodeEditorAreaProps) => {
  const { isFocusWithin, focusWithinProps } = useCodeEditorOnFocus();
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();

  return (
    <div className='script-area' {...focusWithinProps}>
      {isFocusWithin || browser.open ? (
        <>
          <ResizableCodeEditor {...props} onMountFuncs={[setEditor, monacoAutoFocus]} macro={true} />
          <Browser {...browser} types={['attr', 'cms']} accept={modifyEditor} />
        </>
      ) : (
        <Textarea {...props} />
      )}
    </div>
  );
};

export default MacroArea;
