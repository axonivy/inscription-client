import './ScriptArea.css';
import ResizableCodeEditor, { CodeEditorAreaProps } from './ResizableCodeEditor';
import { Browser, useBrowser } from '../../../components/browser';
import { useModifyEditor } from './useCodeEditor';
import { usePath } from '../../../context';

const ScriptArea = (props: CodeEditorAreaProps) => {
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();
  const path = usePath();

  return (
    <div className='script-area'>
      <ResizableCodeEditor {...props} location={path} onMountFuncs={[setEditor]} />
      <Browser {...browser} types={['attr', 'cms']} accept={modifyEditor} location={path} />
    </div>
  );
};

export default ScriptArea;
