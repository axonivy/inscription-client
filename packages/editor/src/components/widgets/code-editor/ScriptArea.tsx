import './ScriptArea.js';
import type { CodeEditorAreaProps } from './ResizableCodeEditor.js';
import ResizableCodeEditor from './ResizableCodeEditor.js';
import { Browser, useBrowser } from '../../../components/browser/index.js';
import { useModifyEditor } from './useCodeEditor.js';
import { usePath } from '../../../context/index.js';

const ScriptArea = (props: CodeEditorAreaProps) => {
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor({ scriptAreaDatatypeEditor: true });
  const path = usePath();

  return (
    <div className='script-area'>
      <ResizableCodeEditor {...props} location={path} onMountFuncs={[setEditor]} />
      <Browser {...browser} types={props.browsers} accept={modifyEditor} location={path} />
    </div>
  );
};

export default ScriptArea;
