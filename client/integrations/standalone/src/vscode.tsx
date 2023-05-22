import { FormLanguage, InscriptionClient, InscriptionClientMock, MonacoUtil } from '@axonivy/inscription-core';
import { AutoSaveApp } from '@axonivy/inscription-editor/lib/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClientContextInstance, MonacoEditorUtil } from '../../../packages/editor/lib';
import './index.css';

declare var acquireVsCodeApi: any;

interface Message {
  command: string;
}

interface PidMessage extends Message {
  args: { pid?: string };
}

interface SetMonacoThemeMessage extends Message {
  args: { theme: string };
}

export async function start(): Promise<void> {
  // for the demonstration we do not load web workers as their support is not great in web extensions
  // potential work arounds can be found here: https://github.com/microsoft/vscode/issues/87282
  MonacoUtil.initStandalone(false);
  const reactMonaco = MonacoEditorUtil.initMonaco();
  FormLanguage.startWebSocketClient('ws://localhost:5013');

  const root = ReactDOM.createRoot(document.getElementById('root')!);
  const inscriptionClient = new InscriptionClientMock();

  window.addEventListener('message', event => {
    const message = event.data;
    switch (message?.command) {
      case 'pid':
        const pidMessage = message as PidMessage;
        root.render(render(inscriptionClient, pidMessage.args.pid));
        break;
      case 'theme':
        const themeMessage = message as SetMonacoThemeMessage;
        reactMonaco.editor.setTheme(themeMessage.args.theme);
        break;
    }
  });

  root.render(render(inscriptionClient, '1'));

  const vscode = acquireVsCodeApi();
  vscode.postMessage({ command: 'ready' });
}

export function render(inscriptionClient: InscriptionClient, pid: string = '1'): React.ReactNode {
  return (
    <React.StrictMode>
      <ClientContextInstance.Provider value={{ client: inscriptionClient }}>
        <AutoSaveApp pid={pid} />
      </ClientContextInstance.Provider>
    </React.StrictMode>
  );
}

start();
