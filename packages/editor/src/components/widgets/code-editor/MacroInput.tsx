import './ScriptInput.css';
import SingleLineCodeEditor, { CodeEditorInputProps } from './SingleLineCodeEditor';
import { useCodeEditorOnFocus, useModifyEditor } from './useCodeEditor';
import { Input } from '../input';
import { Browser, useBrowser } from '../../../components/browser';
import { usePath } from '../../../context';

type MacroInputProps = Omit<CodeEditorInputProps, 'context'>;

const MacroInput = (props: MacroInputProps) => {
  const { isFocusWithin, focusWithinProps } = useCodeEditorOnFocus();
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();
  const path = usePath();

  return (
    // tabIndex is needed for safari to catch the focus when click on browser button
    <div className='script-input' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <SingleLineCodeEditor {...props} context={{ location: path }} macro={true} onMountFuncs={[setEditor]} />
          <Browser {...browser} types={['attr']} accept={value => modifyEditor(`<%=${value}%>`)} location={path} />
        </>
      ) : (
        <Input {...props} />
      )}
    </div>
  );
};

export default MacroInput;
