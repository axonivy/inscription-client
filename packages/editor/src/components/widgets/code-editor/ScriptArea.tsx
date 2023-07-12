import './ScriptArea.css';
import ResizableCodeEditor, { CodeEditorAreaProps } from './ResizableCodeEditor';
import { Browser, useBrowser } from '../../../components/browser';
import { useModifyEditor } from './useCodeEditor';

const ScriptArea = (props: CodeEditorAreaProps) => {
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();

  return (
    <div className='script-area'>
      <ResizableCodeEditor {...props} onMountFuncs={[setEditor]} />
      <Browser {...browser} types={['attr', 'cms']} accept={modifyEditor} location={props.location} />
    </div>
  );
};

export default ScriptArea;