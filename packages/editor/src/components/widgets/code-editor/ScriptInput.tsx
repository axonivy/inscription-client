import './ScriptInput.js';
import { Input } from '../input/index.js';
import type { CodeEditorInputProps } from './SingleLineCodeEditor.js';
import SingleLineCodeEditor from './SingleLineCodeEditor.js';
import { useModifyEditor } from './useCodeEditor.js';
import { Browser, useBrowser } from '../../../components/browser/index.js';
import { usePath } from '../../../context/index.js';
import { useOnFocus } from '../../../components/browser/useOnFocus.js';

const ScriptInput = ({
  value,
  onChange,
  type,
  editorOptions,
  keyActions,
  modifyAction,
  browsers,
  ...props
}: CodeEditorInputProps & { type: string }) => {
  const { isFocusWithin, focusWithinProps, focusValue } = useOnFocus(value, onChange);
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor({ modifyAction: modifyAction });
  const path = usePath();

  return (
    // tabIndex is needed for safari to catch the focus when click on browser button
    <div className='script-input' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <SingleLineCodeEditor
            {...focusValue}
            {...props}
            context={{ type, location: path }}
            onMountFuncs={[setEditor]}
            editorOptions={editorOptions}
            keyActions={keyActions}
          />
          <Browser {...browser} types={browsers} accept={modifyEditor} location={path} />
        </>
      ) : (
        <Input value={value} onChange={onChange} {...props} />
      )}
    </div>
  );
};

export default ScriptInput;
