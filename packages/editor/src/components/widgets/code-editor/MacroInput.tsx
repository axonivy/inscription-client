import './ScriptInput.css';
import type { CodeEditorInputProps } from './SingleLineCodeEditor';
import SingleLineCodeEditor from './SingleLineCodeEditor';
import { useModifyEditor } from './useCodeEditor';
import { Browser, useBrowser } from '../../../components/browser';
import { usePath } from '../../../context';
import { CardText } from '../output/CardText';
import { useOnFocus } from '../../../components/browser/useOnFocus';

type MacroInputProps = Omit<CodeEditorInputProps, 'context'>;

const MacroInput = ({ value, onChange, browsers, ...props }: MacroInputProps) => {
  const { isFocusWithin, focusWithinProps, focusValue } = useOnFocus(value, onChange);
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor({ modifyAction: value => `<%=${value}%>` });
  const path = usePath();

  return (
    // tabIndex is needed for safari to catch the focus when click on browser button
    <div className='script-input' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <SingleLineCodeEditor {...focusValue} {...props} context={{ location: path }} macro={true} onMountFuncs={[setEditor]} />
          <Browser {...browser} types={browsers} accept={modifyEditor} location={path} />
        </>
      ) : (
        <CardText value={value} {...props} />
      )}
    </div>
  );
};

export default MacroInput;
