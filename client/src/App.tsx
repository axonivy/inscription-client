import './App.css';
import Editor from './components/InscriptionEditor';
import { useUserDialogEditor } from './data/editor';

function App() {
  const userDialogProps = useUserDialogEditor();

  return (
    <div className='App-header'>
      <Editor {...userDialogProps} />
    </div>
  );
}

export default App;
