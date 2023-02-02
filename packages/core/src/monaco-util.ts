import 'monaco-editor/esm/vs/editor/editor.all.js';

// support all editor features
import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickInput/standaloneQuickInputService.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js';

//@ts-ignore
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import { StandaloneServices } from 'vscode/services';

import { MonacoServices } from 'monaco-languageclient';

import { buildWorkerDefinition } from 'monaco-editor-workers';

export namespace MonacoUtil {
  export function initStandalone() {
    StandaloneServices.initialize({});
    MonacoServices.install();
    buildWorkerDefinition('../../node_modules/monaco-editor-workers/dist/workers', new URL('', window.location.href).href, false);

    // eslint-disable-next-line no-restricted-globals
    self.MonacoEnvironment = {
      getWorker(_, label) {
        // if (label === 'json') {
        //   return new jsonWorker();
        // }
        // if (label === 'css' || label === 'scss' || label === 'less') {
        //   return new cssWorker();
        // }
        // if (label === 'html' || label === 'handlebars' || label === 'razor') {
        //   return new htmlWorker();
        // }
        // if (label === 'typescript' || label === 'javascript') {
        //   return new tsWorker();
        // }
        return new editorWorker();
      }
    };
  }
}
