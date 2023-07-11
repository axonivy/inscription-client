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
    // tabIndex is needed for safari to catch the focus when click on browser button
    <div className='script-area' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <ResizableCodeEditor {...props} onMountFuncs={[setEditor, monacoAutoFocus]} macro={true} />
          <Browser {...browser} types={['attr', 'cms']} accept={value => modifyEditor(`<%=${value}%>`)} location={props.location} />
        </>
      ) : (
        <Textarea {...props} />
      )}
    </div>
  );
};

export default MacroArea;
