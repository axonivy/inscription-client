import { TableUtil, render, screen, userEvent } from 'test-utils';
import { useCmsBrowser } from './CmsBrowser';
import { describe, test, expect } from 'vitest';
import type { BrowserValue } from './Browser';

const Browser = (props: { location: string; accept: (value: BrowserValue) => void }) => {
  const browser = useCmsBrowser(() => {}, props.location);
  return (
    <>
      {browser.content}
      <button data-testid='accept' onClick={() => props.accept(browser.accept())} />
    </>
  );
};

describe('CmsBrowser', () => {
  function renderBrowser(options?: { location?: string; accept?: (value: BrowserValue) => void }) {
    render(<Browser location={options?.location ?? 'something'} accept={options?.accept ?? (() => {})} />, {
      wrapperProps: {
        meta: {
          contentObject: [
            {
              name: 'Macro',
              fullPath: '/Macro',
              type: 'STRING',
              values: {
                en: '<%=ivy.html.get("in.date")%> <%=ivy.cms.co("/ProcessPages/test/Panel1")%>'
              },
              children: []
            },
            {
              name: 'CoolFile',
              fullPath: '/CoolFile',
              type: 'FILE',
              values: {},
              children: []
            }
          ]
        }
      }
    });
  }

  test('render', async () => {
    renderBrowser();
    await TableUtil.assertRowCount(2);
  });

  test('accept', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value.cursorValue) });
    await userEvent.click(await screen.findByRole('cell', { name: 'Macro' }));
    await userEvent.click(screen.getByTestId('accept'));
    expect(data).toEqual('ivy.cms.co("/Macro")');
  });

  test('file', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value.cursorValue) });
    await userEvent.click(await screen.findByRole('cell', { name: 'CoolFile' }));
    await userEvent.click(screen.getByTestId('accept'));
    expect(data).toEqual('ivy.cms.cr("/CoolFile")');
  });

  test('file in mail attachments', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value.cursorValue), location: 'attachments' });
    await userEvent.click(await screen.findByRole('cell', { name: 'CoolFile' }));
    await userEvent.click(screen.getByTestId('accept'));
    expect(data).toEqual('ivy.cm.findObject("/CoolFile")');
  });
  test('file in mail content', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value.cursorValue), location: 'message' });
    await userEvent.click(await screen.findByRole('cell', { name: 'CoolFile' }));
    await userEvent.click(screen.getByTestId('accept'));
    expect(data).toEqual('ivy.cms.co("/CoolFile")');
  });
});
