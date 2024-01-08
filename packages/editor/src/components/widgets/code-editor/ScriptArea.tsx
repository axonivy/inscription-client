import './ScriptArea.css';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
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
  const { setEditor, modifyEditor, getMonacoSelection, getSelectionRange } = useMonacoEditor();
  const path = usePath();
  const keyActionMountFunc = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editor.addCommand(monaco.KeyCode.F2, () => {
      props.maximizeState.setIsMaximizedCodeEditorOpen(true);
    });
  };

  return (
    <>
      <MaximizedCodeEditorBrowser
        open={props.maximizeState.isMaximizedCodeEditorOpen}
        onOpenChange={props.maximizeState.setIsMaximizedCodeEditorOpen}
        browsers={props.browsers}
        editorValue={props.value}
        location={path}
        applyEditor={props.onChange}
        selectionRange={getSelectionRange()}
      />
      {!props.maximizeState.isMaximizedCodeEditorOpen && (
        <div className='script-area'>
          <ResizableCodeEditor {...props} location={path} onMountFuncs={[setEditor, keyActionMountFunc]} />

          <Browser {...browser} types={props.browsers} accept={modifyEditor} location={path} initSearchFilter={getMonacoSelection} />
        </div>
      )}
    </>
  );
};

export default ScriptArea;
