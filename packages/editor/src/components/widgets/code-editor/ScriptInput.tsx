import { Input } from '../input';
import SingleLineCodeEditor, { CodeEditorInputProps } from './SingleLineCodeEditor';
import { useCodeEditorOnFocus } from './useCodeEditorOnFocus';

const ScriptInput = (props: CodeEditorInputProps) => {
  const { active, onBlur, nonFocusProps } = useCodeEditorOnFocus(props);
  if (active) {
    return (
      <div onBlur={onBlur}>
        <SingleLineCodeEditor {...props} />
      </div>
    );
  }
  return <Input {...nonFocusProps} />;
};

export default ScriptInput;
