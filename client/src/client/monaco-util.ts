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
import { StandaloneServices } from 'vscode/services';

import { MonacoServices } from 'monaco-languageclient';

import { loader } from "@monaco-editor/react";
import { buildWorkerDefinition } from 'monaco-editor-workers';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

export const MINIMAL_STYLE: monaco.editor.IStandaloneEditorConstructionOptions = {
    glyphMargin: false,
    lineNumbers: 'off',
    minimap: { enabled: false },
    overviewRulerBorder: false,
    overviewRulerLanes: 1,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    folding: false,
    renderLineHighlight: 'none',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: 12
}

export namespace MonacoUtil {
    export function initStandalone() {
        loader.config({ monaco });
        StandaloneServices.initialize({});
        MonacoServices.install();
        buildWorkerDefinition('../../node_modules/monaco-editor-workers/dist/workers', new URL('', window.location.href).href, false);
    }

    export function registerThemes() {
        monaco.editor.defineTheme('axon-input', {
            base: 'vs-dark',
            colors: {
                'editor.foreground': '#FFFFFF',
                'editorCursor.foreground': '#FFFFFF',
                'editor.background': '#202020',
            },
            inherit: true,
            rules: []
        });
    }
}
