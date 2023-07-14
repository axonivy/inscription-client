import './ScriptArea.css';
import { Browser, useBrowser } from '../../../components/browser';
import { Textarea } from '../input';
import ResizableCodeEditor, { CodeEditorAreaProps } from './ResizableCodeEditor';
import { monacoAutoFocus, useCodeEditorOnFocus, useModifyEditor } from './useCodeEditor';
import { usePath } from '../../../context';

const MacroArea = (props: CodeEditorAreaProps) => {
  const { isFocusWithin, focusWithinProps } = useCodeEditorOnFocus();
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();
  const path = usePath();

  return (
    // tabIndex is needed for safari to catch the focus when click on browser button
    <div className='script-area' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <ResizableCodeEditor {...props} location={path} onMountFuncs={[setEditor, monacoAutoFocus]} macro={true} />
          <Browser {...browser} types={['attr', 'cms']} accept={value => modifyEditor(`<%=${value}%>`)} location={path} />
        </>
      ) : (
        <Textarea {...props} />
      )}
    </div>
  );
};

export default MacroArea;
