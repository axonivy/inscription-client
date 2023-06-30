import './ScriptInput.css';
import SingleLineCodeEditor, { CodeEditorInputProps } from './SingleLineCodeEditor';
import { useCodeEditorOnFocus, useModifyEditor } from './useCodeEditor';
import { Input } from '../input';
import { Browser, useBrowser } from '../../../components/browser';

const MacroInput = (props: CodeEditorInputProps) => {
  const { isFocusWithin, focusWithinProps } = useCodeEditorOnFocus();
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();

  return (
    <div className='script-input' {...focusWithinProps}>
      {isFocusWithin || browser.open ? (
        <>
          <SingleLineCodeEditor {...props} macro={true} onMountFuncs={[setEditor]} />
          <Browser {...browser} types={['attr']} accept={modifyEditor} />
        </>
      ) : (
        <Input {...props} />
      )}
    </div>
  );
};

export default MacroInput;
