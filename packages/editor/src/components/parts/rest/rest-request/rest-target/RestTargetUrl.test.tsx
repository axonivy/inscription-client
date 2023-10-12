import { RestRequestData } from '@axonivy/inscription-protocol';
import { RestTargetUrl } from './RestTargetUrl';
import { DeepPartial, render, screen } from 'test-utils';

describe('RestTargetUrl', () => {
  const REST_CLIENT_URI = 'http://127.0.0.1:8081/designer/{ivy.var.myVar}/v1';
  async function renderTargetUrl(data?: DeepPartial<RestRequestData>) {
    render(<RestTargetUrl />, { wrapperProps: { data: data && { config: data }, meta: { restClientUri: REST_CLIENT_URI } } });
    await screen.findByText(/127.0.0.1:8081/);
  }

  test('empty', async () => {
    await renderTargetUrl();
    expect(screen.getByText(/127.0.0.1:8081/)).toHaveTextContent(REST_CLIENT_URI);
    expect(screen.getByText('{ivy.var.myVar}')).toBeVisible();
  });

  test('path', async () => {
    await renderTargetUrl({ target: { path: '/{path}/test123' } });
    expect(screen.getByText(/127.0.0.1:8081/)).toHaveTextContent(REST_CLIENT_URI + '/{path}/test123');
    expect(screen.getByText('{path}')).toBeVisible();
  });

  test('query', async () => {
    await renderTargetUrl({ target: { path: '/{path}/test123', queryParams: { q1: 'bla', hi: '' } } });
    expect(screen.getByText(/127.0.0.1:8081/)).toHaveTextContent(REST_CLIENT_URI + '/{path}/test123?q1=bla&hi');
    expect(screen.getByText('q1')).toBeVisible();
    expect(screen.getByText('bla')).toBeVisible();
    expect(screen.getByText('hi')).toBeVisible();
  });
});
