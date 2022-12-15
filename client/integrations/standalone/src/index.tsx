import { FormLanguage } from '@axon-ivy/core/lib/form-client';
import { InscriptionClient } from '@axon-ivy/core/lib/inscription-client';
import { MonacoUtil } from '@axon-ivy/core/lib/monaco-util';
import App from '@axon-ivy/react-ui/lib/App';
import { ClientContextInstance } from '@axon-ivy/react-ui/lib/context/useClient';
import { MonacoEditorUtil } from '@axon-ivy/react-ui/lib/monaco-editor-util';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

export async function start(): Promise<void> {
  MonacoEditorUtil.initMonaco(monaco);
  MonacoUtil.initStandalone();
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  try {
    await FormLanguage.startWebSocketClient('ws://localhost:5013');

    const inscriptionClient = await InscriptionClient.startWebSocketClient('ws://localhost:5015');
    console.log(await inscriptionClient.initialize());

    root.render(
      <React.StrictMode>
        <ClientContextInstance.Provider value={{ client: inscriptionClient }}>
          <App id={1} />
        </ClientContextInstance.Provider>
      </React.StrictMode>
    );
  } catch (error) {
    root.render(<div>{error as string}</div>)
  }

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

start();
