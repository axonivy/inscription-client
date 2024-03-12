import { defaultThemeMode, type ThemeMode } from '@axonivy/inscription-editor';

export namespace URLParams {
  export function parameter(key: string): string | undefined {
    const param = new URLSearchParams(window.location.search).get(key);
    return param !== null ? decodeURIComponent(param) : undefined;
  }

  export function app(): string {
    return parameter('app') ?? '';
  }

  export function pmv(): string {
    return parameter('pmv') ?? '';
  }

  export function pid(): string {
    return parameter('pid') ?? '';
  }

  export function webSocketBase(): string {
    return `${isSecureConnection() ? 'wss' : 'ws'}://${server()}`;
  }

  export function themeMode(): ThemeMode {
    return (parameter('theme') as ThemeMode) ?? defaultThemeMode();
  }

  const isSecureConnection = () => {
    const secureParam = parameter('secure');
    if (secureParam === 'true') {
      return true;
    }
    if (secureParam === 'false') {
      return false;
    }
    return window.location.protocol === 'https:';
  };

  const server = () => {
    return parameter('server') ?? basePath();
  };

  const basePath = () => {
    const protocol = window.location.protocol;
    const href = window.location.href;
    if (href.includes('/process-inscription')) {
      return href.substring(protocol.length + 2, href.indexOf('/process-inscription'));
    }
    return 'localhost:8081';
  };
}
