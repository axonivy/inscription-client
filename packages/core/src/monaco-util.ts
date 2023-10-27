import 'monaco-editor/esm/vs/editor/editor.all.js';

import { initServices } from 'monaco-languageclient';

import { buildWorkerDefinition } from 'monaco-editor-workers';

export namespace MonacoUtil {
  export async function initStandalone(worker?: new () => Worker) {
    await initServices();
    buildWorkerDefinition('../../node_modules/monaco-editor-workers/dist/workers', new URL('', window.location.href).href, false);

    if (worker) {
      self.MonacoEnvironment = {
        getWorker() {
          return new worker();
        }
      };
    }
  }
}
