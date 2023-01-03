import { loader, Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { ThemeContext } from './context/useTheme';

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
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: 12
};

export namespace MonacoEditorUtil {
  export function initMonaco(monaco: Monaco, theme: ThemeContext) {
    loader.config({ monaco });

    monaco.languages.register({
      id: 'form',
      extensions: ['.form', '.form'],
      aliases: ['Form', 'form']
    });

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
