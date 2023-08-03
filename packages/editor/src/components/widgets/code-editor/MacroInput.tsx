import './ScriptInput.css';
import SingleLineCodeEditor, { CodeEditorInputProps } from './SingleLineCodeEditor';
import { useCodeEditorOnFocus, useModifyEditor } from './useCodeEditor';
import { Browser, useBrowser } from '../../../components/browser';
import { usePath } from '../../../context';
import { CardText } from '../output/CardText';

type MacroInputProps = Omit<CodeEditorInputProps, 'context'>;

const MacroInput = ({ value, onChange, ...props }: MacroInputProps) => {
  const { isFocusWithin, focusWithinProps, focusValue } = useCodeEditorOnFocus(value, onChange);
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();
  const path = usePath();

  return (
    // tabIndex is needed for safari to catch the focus when click on browser button
    <div className='script-input' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <SingleLineCodeEditor {...focusValue} {...props} context={{ location: path }} macro={true} onMountFuncs={[setEditor]} />
          <Browser {...browser} types={['attr']} accept={value => modifyEditor(`<%=${value}%>`)} location={path} />
        </>
      ) : (
        <CardText value={value} {...props} />
      )}
    </div>
  );
};

export default MacroInput;
