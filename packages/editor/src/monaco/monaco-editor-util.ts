import { loader, Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { ThemeMode } from '../context/useTheme';
import { ivyScriptConf, ivyScriptLang } from './ivy-script-language';

export const MONACO_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
  glyphMargin: false,
  lineNumbers: 'off',
  minimap: { enabled: false },
  overviewRulerBorder: false,
  overviewRulerLanes: 1,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  folding: false,
  renderLineHighlight: 'none',
  fontFamily:
    "'Droid Sans Mono', 'monospace', monospace, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: 12,
  tabSize: 2,
  renderWhitespace: 'all',
  fixedOverflowWidgets: true
};

export const SINGLE_LINE_MONACO_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
  ...MONACO_OPTIONS,
  overviewRulerLanes: 0,
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  scrollBeyondLastColumn: 0,
  scrollbar: {
    horizontal: 'hidden',
    vertical: 'hidden',
    alwaysConsumeMouseWheel: false
  },
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: 'never',
    seedSearchStringFromSelection: 'never'
  },
  // wordBasedSuggestions: false,
  links: false,
  renderLineHighlight: 'none',
  contextmenu: false,
  // roundedSelection: false,
  fixedOverflowWidgets: true
};

export namespace MonacoEditorUtil {
  export const DEFAULT_THEME_NAME = 'axon-input';
  export async function initMonaco(monaco: Monaco, theme: ThemeMode): Promise<Monaco> {
    loader.config({ monaco });

    return loader.init().then(monaco => {
      monaco.languages.register({
        id: 'ivyScript',
        extensions: ['.ivyScript', '.ivyScript'],
        aliases: ['IvyScript', 'ivyScript']
      });
      monaco.languages.setLanguageConfiguration('ivyScript', ivyScriptConf);
      monaco.languages.setMonarchTokensProvider('ivyScript', ivyScriptLang);

      monaco.editor.defineTheme(DEFAULT_THEME_NAME, themeData(theme));
      return monaco;
    });
  }

  function themeData(theme: ThemeMode): monaco.editor.IStandaloneThemeData {
    if (theme === 'dark') {
      return {
        base: 'vs-dark',
        colors: {
          'editor.foreground': '#FFFFFF',
          'editorCursor.foreground': '#FFFFFF',
          'editor.background': '#1b1b1b'
        },
        inherit: true,
        rules: []
      };
    }
    return {
      base: 'vs',
      colors: {
        'editor.foreground': '#202020',
        'editorCursor.foreground': '#202020',
        'editor.background': '#ffffff'
      },
      inherit: true,
      rules: []
    };
  }
}
