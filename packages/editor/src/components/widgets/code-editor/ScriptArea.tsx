import './ScriptArea.css';
import type { CodeEditorAreaProps } from './ResizableCodeEditor';
import ResizableCodeEditor from './ResizableCodeEditor';
import { Browser, useBrowser } from '../../../components/browser';
import { useMonacoEditor } from './useCodeEditor';
import { usePath } from '../../../context';
import MaximizedCodeEditorBrowser from '../../browser/MaximizedCodeEditorBrowser';

type ScriptAreaProps = CodeEditorAreaProps & {
  maximizeState: {
    isMaximizedCodeEditorOpen: boolean;
    setIsMaximizedCodeEditorOpen: (open: boolean) => void;
  };
};

const ScriptArea = (props: ScriptAreaProps) => {
  const browser = useBrowser();
  const { setEditor, modifyEditor, getMonacoSelection } = useMonacoEditor({ scriptAreaDatatypeEditor: true });
  const path = usePath();

  return props.maximizeState.isMaximizedCodeEditorOpen ? (
    <MaximizedCodeEditorBrowser
      open={props.maximizeState.isMaximizedCodeEditorOpen}
      onOpenChange={props.maximizeState.setIsMaximizedCodeEditorOpen}
      browsers={props.browsers}
      editorValue={props.value}
      location={path}
      applyEditor={props.onChange}
    />
  ) : (
    <div className='script-area'>
      <ResizableCodeEditor {...props} location={path} onMountFuncs={[setEditor]} />
      <Browser {...browser} types={props.browsers} accept={modifyEditor} location={path} initSearchFilter={getMonacoSelection} />
    </div>
  );
};

export default ScriptArea;
