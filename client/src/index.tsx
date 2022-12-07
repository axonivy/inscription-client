import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { FormLanguage } from './client/form-client';
import { InscriptionClient } from './client/inscription-client';
import { MonacoUtil } from './client/monaco-util';

export async function start(): Promise<void> {
  MonacoUtil.initStandalone();
  MonacoUtil.registerThemes();

  await FormLanguage.startWebSocketClient('ws://localhost:5013');

  const inscriptionClient = await InscriptionClient.startWebSocketClient('ws://localhost:5015');
  console.log(await inscriptionClient.initialize());
  const initialData = await inscriptionClient.userDialog(1);
  console.log('INITIAL DATA', initialData);
  inscriptionClient.onUserDialogChanged(dialog => console.log('NEW DATA', dialog));

  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );


  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

start();
