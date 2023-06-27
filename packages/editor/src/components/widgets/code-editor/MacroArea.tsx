import { Textarea } from '../input';
import ResizableCodeEditor, { CodeEditorAreaProps } from './ResizableCodeEditor';
import { monacoAutoFocus, useCodeEditorOnFocus } from './useCodeEditorOnFocus';

const MacroArea = (props: CodeEditorAreaProps) => {
  const { active, onBlur, nonFocusProps } = useCodeEditorOnFocus(props);
  if (active) {
    return (
      <div onBlur={onBlur}>
        <ResizableCodeEditor {...props} onMount={monacoAutoFocus} macro={true} />;
      </div>
    );
  }
  return <Textarea {...nonFocusProps} />;
};

export default MacroArea;
