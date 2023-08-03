import './ScriptInput.css';
import { Input } from '../input';
import SingleLineCodeEditor, { CodeEditorInputProps } from './SingleLineCodeEditor';
import { useCodeEditorOnFocus, useModifyEditor } from './useCodeEditor';
import { Browser, useBrowser } from '../../../components/browser';
import { usePath } from '../../../context';

const ScriptInput = ({ value, onChange, type, editorOptions, keyActions, ...props }: CodeEditorInputProps & { type: string }) => {
  const { isFocusWithin, focusWithinProps, focusValue } = useCodeEditorOnFocus(value, onChange);
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();
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
          <Browser {...browser} types={['attr', 'cms']} accept={modifyEditor} location={path} />
        </>
      ) : (
        <Input value={value} onChange={onChange} {...props} />
      )}
    </div>
  );
};

export default ScriptInput;
