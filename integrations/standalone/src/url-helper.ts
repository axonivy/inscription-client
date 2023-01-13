import { ThemeContext } from '@axonivy/inscription-editor/src/context/useTheme';

export namespace URLParams {
  export function getParameter(key: string): string | undefined {
    return new URLSearchParams(window.location.search).get(key);
  }

  export function getPid(): string {
    return getParameter('pid') ?? defaultPid();
  }

  export function getServer(): string {
    return getParameter('server') ?? defaultServer();
  }

  export function getThemeMode(): ThemeContext {
    return getParameter('theme') ?? defaultTheme();
  }

  function defaultPid(): string {
    if (isEclipseIntegration()) {
      return '';
    }
    return '15254DC87A1B183B-f5';
  }

  function defaultServer(): string {
    if (isEclipseIntegration()) {
      return `${window.location.host}/designer`;
    }
    return 'localhost:8081/designer';
  }

  function defaultTheme(): ThemeContext {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function isEclipseIntegration() {
    return window.location.pathname.startsWith('/designer/process-inscription');
  }
}
