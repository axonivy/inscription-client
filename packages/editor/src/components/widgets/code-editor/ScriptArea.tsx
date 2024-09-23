import './ScriptArea.css';
// import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Browser, useBrowser } from '../../../components/browser';
import { useMonacoEditor } from './useCodeEditor';
import { usePath } from '../../../context';
import MaximizedCodeEditorBrowser from '../../browser/MaximizedCodeEditorBrowser';
import { useField } from '@axonivy/ui-components';
import { /*MonacoEditorUtil,*/ ResizableCodeEditor } from '@axonivy/codemirror';
import { useContextPath } from './useContextPath';
import type { CodeEditorAreaProps, MaximizedCodeEditorState } from './code-editor-props';

type ScriptAreaProps = CodeEditorAreaProps & Required<MaximizedCodeEditorState>;

const ScriptArea = ({ maximizeState, ...props }: ScriptAreaProps) => {
  const browser = useBrowser();
  const { /*setEditor,*/ modifyEditor, getMonacoSelection /*, getSelectionRange*/ } = useMonacoEditor();
  const path = usePath();
  const contextPath = useContextPath();
  // const keyActionMountFunc = (editor: monaco.editor.IStandaloneCodeEditor) => {
  //   editor.addCommand(MonacoEditorUtil.KeyCode.F2, () => {
  //     maximizeState.setIsMaximizedCodeEditorOpen(true);
  //   });
  // };
  // const setScrollPosition = (editor: monaco.editor.IStandaloneCodeEditor) => {
  //   const text = editor.getValue();
  //   const importRegex = /^import .+;/gm;
  //   const importMatches = text.match(importRegex);
  //   const importAmount = importMatches ? importMatches.length : 0;
  //   editor.revealLine(importAmount + 1);
  // };

  const { inputProps } = useField();

  return (
    <>
      <MaximizedCodeEditorBrowser
        open={maximizeState.isMaximizedCodeEditorOpen}
        onOpenChange={maximizeState.setIsMaximizedCodeEditorOpen}
        browsers={props.browsers}
        editorValue={props.value}
        location={path}
        applyEditor={props.onChange}
        // selectionRange={getSelectionRange()}
      />
      {!maximizeState.isMaximizedCodeEditorOpen && (
        <div className='script-area'>
          <ResizableCodeEditor
            {...inputProps}
            {...props}
            language='ivyScript'
            initHeight={props.value.length > 0 ? 250 : undefined}
            contextPath={contextPath}
            // onMountFuncs={[setEditor, keyActionMountFunc, setScrollPosition]}
          />
          <Browser {...browser} types={props.browsers} accept={modifyEditor} location={path} initSearchFilter={getMonacoSelection} />
        </div>
      )}
    </>
  );
};

export default ScriptArea;
