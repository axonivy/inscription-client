import { ThemeMode } from '@axonivy/inscription-editor';

export namespace URLParams {
  export function parameter(key: string): string | undefined {
    const param = new URLSearchParams(window.location.search).get(key);
    return param !== null ? param : undefined;
  }

  export function app(): string {
    return parameter('app') ?? '';
  }

  export function pmv(): string {
    return parameter('pmv') ?? '';
  }

  export function pid(): string {
    return parameter('pid') ?? defaultPid();
  }

  export function webSocketBase(): string {
    return `${isSecureConnection() ? 'wss' : 'ws'}://${server()}`;
  }

  export function themeMode(): ThemeMode {
    return (parameter('theme') as ThemeMode) ?? defaultTheme();
  }

  function isSecureConnection(): boolean {
    return window.location.protocol === 'https:' || parameter('secure') === 'true';
  }

  function defaultPid(): string {
    if (window.location.pathname.includes('designer')) {
      return '';
    }
    return '15254DC87A1B183B-f5';
  }

  function server(): string {
    return parameter('server') ?? basePath();
  }

  function basePath(): string {
    const protocol = window.location.protocol;
    const href = window.location.href;
    if (href.includes('/process-inscription')) {
      return href.substring(protocol.length + 2, href.indexOf('/process-inscription'));
    }
    return 'localhost:8081/designer';
  }

  function defaultTheme(): ThemeMode {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
