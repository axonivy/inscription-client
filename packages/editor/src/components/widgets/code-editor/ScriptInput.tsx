import './ScriptInput.css';
import { Input } from '../input';
import SingleLineCodeEditor, { CodeEditorInputProps } from './SingleLineCodeEditor';
import { useCodeEditorOnFocus, useModifyEditor } from './useCodeEditor';
import { Browser, useBrowser } from '../../../components/browser';

const ScriptInput = (props: CodeEditorInputProps) => {
  const { isFocusWithin, focusWithinProps } = useCodeEditorOnFocus();
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();

  return (
    // tabIndex is needed for safari to catch the focus when click on browser button
    <div className='script-input' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <SingleLineCodeEditor {...props} onMountFuncs={[setEditor]} />
          <Browser {...browser} types={['attr', 'cms']} accept={modifyEditor} location={props.location} />
        </>
      ) : (
        <Input {...props} />
      )}
    </div>
  );
};

export default ScriptInput;
