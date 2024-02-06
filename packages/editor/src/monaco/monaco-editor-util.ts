import type { Monaco } from '@monaco-editor/react';
import { loader } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import type { ThemeMode } from '../context/useTheme';
import { ivyScriptConf, ivyScriptLang } from './ivy-script-language';
import { ivyMacroConf, ivyMacroLang } from './ivy-macro-language';

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

export const MAXIMIZED_MONACO_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
  ...MONACO_OPTIONS,
  lineNumbers: 'on',
  folding: true,
  showFoldingControls: 'always'
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
  links: false,
  renderLineHighlight: 'none',
  contextmenu: false
};

export namespace MonacoEditorUtil {
  export const DEFAULT_THEME_NAME = 'axon-input';
  export async function initMonaco(monaco: Monaco, theme: ThemeMode): Promise<Monaco> {
    console.time('MonacoEditorUtil.initMonaco');
    loader.config({ monaco });

    return loader.init().then(monaco => {
      monaco.languages.register({
        id: 'ivyScript',
        extensions: ['.ivyScript', '.ivyScript'],
        aliases: ['IvyScript', 'ivyScript']
      });
      monaco.languages.register({
        id: 'ivyMacro',
        extensions: ['.ivyMacro', '.ivyMacro'],
        aliases: []
      });
      monaco.languages.setLanguageConfiguration('ivyScript', ivyScriptConf);
      monaco.languages.setMonarchTokensProvider('ivyScript', ivyScriptLang);
      monaco.languages.setLanguageConfiguration('ivyMacro', ivyMacroConf);
      monaco.languages.setMonarchTokensProvider('ivyMacro', ivyMacroLang);

      monaco.editor.defineTheme(DEFAULT_THEME_NAME, themeData(theme));
      console.timeEnd('MonacoEditorUtil.initMonaco');
      return monaco;
    });
  }

  export function themeData(theme: ThemeMode): monaco.editor.IStandaloneThemeData {
    if (theme === 'dark') {
      return {
        base: 'vs-dark',
        colors: {
          'editor.foreground': '#FFFFFF',
          'editorCursor.foreground': '#FFFFFF',
          'editor.background': '#2c2c2c'
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
