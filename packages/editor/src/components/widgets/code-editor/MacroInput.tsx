import SingleLineCodeEditor, { CodeEditorInputProps } from './SingleLineCodeEditor';
import { useCodeEditorOnFocus } from './useCodeEditorOnFocus';
import { Input } from '../input';

const MacroInput = (props: CodeEditorInputProps) => {
  const { active, onBlur, nonFocusProps } = useCodeEditorOnFocus(props);
  if (active) {
    return (
      <div onBlur={onBlur}>
        <SingleLineCodeEditor {...props} macro={true} />
      </div>
    );
  }
  return <Input {...nonFocusProps} />;
};

export default MacroInput;
