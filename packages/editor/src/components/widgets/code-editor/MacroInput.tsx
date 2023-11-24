import './ScriptInput.js';
import type { CodeEditorInputProps } from './SingleLineCodeEditor.js';
import SingleLineCodeEditor from './SingleLineCodeEditor.js';
import { useModifyEditor } from './useCodeEditor.js';
import { Browser, useBrowser } from '../../../components/browser/index.js';
import { usePath } from '../../../context/index.js';
import { CardText } from '../output/CardText.js';
import { useOnFocus } from '../../../components/browser/useOnFocus.js';

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
