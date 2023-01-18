import { loader, Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { ThemeContext } from '../context/useTheme';
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
  renderWhitespace: 'all'
};

export namespace MonacoEditorUtil {
  export function initMonaco(monaco: Monaco, theme: ThemeContext) {
    loader.config({ monaco });

    monaco.languages.register({
      id: 'ivyScript',
      extensions: ['.ivyScript', '.ivyScript'],
      aliases: ['IvyScript', 'ivyScript']
    });
    monaco.languages.setLanguageConfiguration('ivyScript', ivyScriptConf);
    monaco.languages.setMonarchTokensProvider('ivyScript', ivyScriptLang);

    monaco.editor.defineTheme('axon-input', themeData(theme));
  }

  function themeData(theme: ThemeContext): monaco.editor.IStandaloneThemeData {
    if (theme === 'dark') {
      return {
        base: 'vs-dark',
        colors: {
          'editor.foreground': '#FFFFFF',
          'editorCursor.foreground': '#FFFFFF',
          'editor.background': '#202020'
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
