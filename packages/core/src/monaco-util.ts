// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

import { initServices } from 'monaco-languageclient';

import { buildWorkerDefinition } from 'monaco-editor-workers';

export namespace MonacoUtil {
  export async function initStandalone() {
    await initServices();
    buildWorkerDefinition('../../node_modules/monaco-editor-workers/dist/workers', new URL('', window.location.href).href, false);

    self.MonacoEnvironment = {
      getWorker() {
        return new editorWorker();
      }
    };
  }
}
