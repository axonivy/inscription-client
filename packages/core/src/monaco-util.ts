import 'monaco-editor/esm/vs/editor/editor.all.js';

import { initServices, wasVscodeApiInitialized } from 'monaco-languageclient';

import { buildWorkerDefinition } from 'monaco-editor-workers';

export namespace MonacoUtil {
  export async function initStandalone(worker?: new () => Worker) {
    await initServices({ userServices: [] });
    buildWorkerDefinition('../../node_modules/monaco-editor-workers/dist/workers', new URL('', window.location.href).href, false);

    if (worker) {
      self.MonacoEnvironment = {
        ...self.MonacoEnvironment,
        getWorker() {
          return new worker();
        }
      };
    }
  }

  export function monacoInitialized() {
    return new Promise<void>((resolve, reject) => {
      const startTime = Date.now();
      const checkInitialized = () => {
        if (wasVscodeApiInitialized()) {
          resolve();
        }
        if (Date.now() > startTime + 3000) {
          reject();
        }
        window.setTimeout(checkInitialized, 100);
      };
      checkInitialized();
    });
  }
}
