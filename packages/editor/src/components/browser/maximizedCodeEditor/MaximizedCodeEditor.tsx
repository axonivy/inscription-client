import './MaximizedCodeEditor.css';
import { useBrowser, type BrowserType } from '../useBrowser';
import { useMonacoEditor } from '../../widgets/code-editor/useCodeEditor';
import CodeEditor from '../../widgets/code-editor/CodeEditor';
import Browser from '../Browser';
import { MAXIMIZED_MONACO_OPTIONS } from '../../../monaco/monaco-editor-util';

type MaximizedCodeEditorProps = {
  editorValue: string;
  location: string;
  browsers: BrowserType[];
  applyEditor: (change: string) => void;
};

const MaximizedCodeEditor = ({ editorValue, location, browsers, applyEditor }: MaximizedCodeEditorProps) => {
  const { setEditor, modifyEditor, getMonacoSelection } = useMonacoEditor({ scriptAreaDatatypeEditor: true });
  const browser = useBrowser();

  return (
    <div className='maximized-script-area'>
      <div className='maximized-code-editor'>
        <CodeEditor
          value={editorValue}
          onChange={applyEditor}
          context={{ location }}
          onMountFuncs={[setEditor]}
          options={MAXIMIZED_MONACO_OPTIONS}
        />
      </div>
      <Browser {...browser} types={browsers} accept={modifyEditor} location={location} initSearchFilter={getMonacoSelection} />
    </div>
  );
};

export default MaximizedCodeEditor;
