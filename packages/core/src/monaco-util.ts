import 'monaco-editor/esm/vs/editor/editor.all.js';

// support all editor features
import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickInput/standaloneQuickInputService.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js';

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
