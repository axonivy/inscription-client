import { InscriptionClientJsonRpc } from '@axonivy/inscription-core';
import { AppStateView } from '@axonivy/inscription-editor';
import { PanelMessage } from '@axonivy/ui-components';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LazyApp, type LazyAppProps } from './lazy-app';
import { URLParams } from './url-helper';
import { IvyIcons } from '@axonivy/ui-icons';

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
    root.render(
      <AppStateView>
        <PanelMessage icon={IvyIcons.ErrorXMark} message={`An error occurred: ${error}`} />
      </AppStateView>
    );
  }
}

start();
