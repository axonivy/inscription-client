import './MaximizedCodeEditor.css';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useBrowser, type BrowserType } from '../useBrowser';
import { monacoAutoFocus, useMonacoEditor } from '../../widgets/code-editor/useCodeEditor';
import CodeEditor from '../../widgets/code-editor/CodeEditor';
import Browser from '../Browser';
import { MAXIMIZED_MONACO_OPTIONS } from '../../../monaco/monaco-editor-util';

export type MaximizedCodeEditorProps = {
  editorValue: string;
  location: string;
  browsers: BrowserType[];
  applyEditor: (change: string) => void;
  selectionRange: monaco.IRange | null;
  open: boolean;
  keyActions?: {
    escape?: () => void;
  };
};

const MaximizedCodeEditor = ({
  editorValue,
  location,
  browsers,
  applyEditor,
  selectionRange,
  keyActions,
  open
}: MaximizedCodeEditorProps) => {
  const { setEditor, modifyEditor, getMonacoSelection } = useMonacoEditor();
  const browser = useBrowser();

  const setSelection = (editor: monaco.editor.IStandaloneCodeEditor) => {
    if (selectionRange !== null) {
      editor.setSelection(selectionRange);
    }
  };
  const keyActionMountFunc = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editor.addCommand(monaco.KeyCode.Escape, () => {
      if (keyActions?.escape) {
        keyActions.escape();
      }
    });
  };

  return (
    open && (
      <div className='maximized-script-area'>
        <div className='maximized-code-editor'>
          <CodeEditor
            value={editorValue}
            onChange={applyEditor}
            context={{ location }}
            onMountFuncs={[setEditor, monacoAutoFocus, setSelection, keyActionMountFunc]}
            options={MAXIMIZED_MONACO_OPTIONS}
          />
        </div>
        <Browser {...browser} types={browsers} accept={modifyEditor} location={location} initSearchFilter={getMonacoSelection} />
      </div>
    )
  );
};

export default MaximizedCodeEditor;
