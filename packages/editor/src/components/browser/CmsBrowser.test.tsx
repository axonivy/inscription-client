import { TableUtil, render, screen, userEvent } from 'test-utils';
import { useCmsBrowser } from './CmsBrowser';

const Browser = (props: { location: string; accept: (value: string) => void }) => {
  const browser = useCmsBrowser();
  return (
    <>
      {browser.content}
      <button data-testid='accept' onClick={() => props.accept(browser.accept())} />
    </>
  );
};

describe('CmsBrowser', () => {
  function renderBrowser(options?: { location?: string; accept?: (value: string) => void }) {
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
            }
          ]
        }
      }
    });
  }

  test('render', async () => {
    renderBrowser();
    await TableUtil.assertRowCount(1);
  });

  test('accept', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value) });
    await userEvent.click(await screen.findByRole('cell', { name: 'Macro' }));
    await userEvent.click(screen.getByTestId('accept'));
    expect(data).toEqual('ivy.cms.co("/Macro")');
  });

  test('acceptEmpty', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value) });
    await userEvent.click(await screen.findByRole('cell', { name: 'Macro' }));
    await userEvent.click(await screen.findByRole('cell', { name: 'Macro' }));
    await userEvent.click(screen.getByTestId('accept'));
    expect(data).toEqual('');
    await userEvent.click(await screen.findByText('Helper Text'));
    expect(screen.getByTitle(`No element selected.`)).toBeInTheDocument();
  });
});
