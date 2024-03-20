import { AppStateView } from '@axonivy/inscription-editor';
import type { ElementType } from '@axonivy/inscription-protocol';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LazyApp, type LazyAppProps } from './lazy-app';
import { InscriptionClientMock } from './mock/inscription-client-mock';
import { URLParams } from './url-helper';

export async function start(): Promise<void> {
  const readonly = URLParams.parameter('readonly') ? true : false;
  const type = (URLParams.parameter('type') as ElementType) ?? undefined;

  const props: LazyAppProps = {
    app: '',
    pmv: '',
    pid: '1',
    theme: URLParams.themeMode(),
    clientCreator: async () => new InscriptionClientMock(readonly, type)
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
