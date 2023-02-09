function serverUrl() {
  const app = process.env.TEST_APP ?? '';
  const server = process.env.BASE_URL ? process.env.BASE_URL + app : 'localhost:8081/designer';
  return server.replace(/^https?:\/\//, '');
}

export function inscriptionView(pid: string): string {
  return `?server=${serverUrl()}&pid=${pid}`;
}
