import { InscriptionClientJsonRpc } from '@axonivy/inscription-core';
import { AppStateView } from '@axonivy/inscription-editor';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LazyApp, type LazyAppProps } from './lazy-app';
import { URLParams } from './url-helper';

export async function start(): Promise<void> {
  const props: LazyAppProps = {
    server: URLParams.webSocketBase(),
    app: URLParams.app(),
    pmv: URLParams.pmv(),
    pid: URLParams.pid(),
    theme: URLParams.themeMode(),
    clientCreator: () => InscriptionClientJsonRpc.startWebSocketClient(props.server!)
  };

  const root = createRoot(document.getElementById('root')!);
  try {
    root.render(<LazyApp {...props} />);
  } catch (error) {
    console.error(error);
    root.render(<AppStateView>{'An error has occurred: ' + error}</AppStateView>);
  }
}

start();
