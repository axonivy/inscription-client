import { TableUtil, render, screen, userEvent } from 'test-utils';
import { useDataTypeBrowser } from './DataTypeBrowser';

const Browser = (props: { location: string; accept: (value: string) => void }) => {
  const browser = useDataTypeBrowser(() => {});
  return (
    <>
      {browser.content}
      <button data-testid='accept' onClick={() => props.accept(browser.accept())} />
    </>
  );
};

describe('DataTypeBrowser', () => {
  function renderBrowser(options?: { location?: string; accept?: (value: string) => void }) {
    render(<Browser location={options?.location ?? 'something'} accept={options?.accept ?? (() => {})} />, {
      wrapperProps: {
        meta: {
          datatypes: [
            {
              simpleName: 'Person',
              packageName: 'ch.ivyteam.test',
              fullQualifiedName: 'ch.ivyteam.test.Person'
            }
          ],
          dataClasses: [
            {
              name: 'AddContactData',
              fullQualifiedName: 'ch.ivyteam.documentation.project.AddContactData',
              packageName: 'ch.ivyteam.documentation.project',
              path: 'dataclasses/ch/ivyteam/documentation/project/AddContactData.ivyClass'
            },
            {
              name: 'Person',
              fullQualifiedName: 'ch.ivyteam.test.Person',
              packageName: 'ch.ivyteam.test',
              path: 'dataclasses/ch/ivyteam/test/Person.ivyClass'
            },
            {
              name: 'List',
              packageName: 'java.util',
              fullQualifiedName: 'java.util.List',
              path: 'thisisaTest'
            }
          ]
        }
      }
    });
  }

  test('renderOnlyDataClasses', async () => {
    renderBrowser();
    await TableUtil.assertRowCount(3);
  });

  test('renderCombinedDatatype', async () => {
    renderBrowser();
    await userEvent.click(screen.getByPlaceholderText('Search'));
    await userEvent.keyboard('Person');
    await TableUtil.assertRowCount(1);
  });

  test('accept', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value) });
    await userEvent.click(await screen.findByRole('cell', { name: 'AddContactData' }));
    await userEvent.click(screen.getByRole('button', { name: '' }));
    expect(data).toEqual('ch.ivyteam.documentation.project.AddContactData');
  });

  test('acceptEmpty', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value) });
    await userEvent.click(screen.getByRole('button', { name: '' }));
    expect(data).toEqual('');
    await userEvent.click(await screen.findByText('Helper Text'));
    expect(screen.getByTitle(`No element selected.`)).toBeInTheDocument();
  });

  test('listGeneric', async () => {
    let data = '';
    renderBrowser({ accept: value => (data = value) });
    await userEvent.click(await screen.findByRole('cell', { name: 'AddContactData' }));
    await userEvent.click(await screen.findByText('Use Type as List'));
    await userEvent.click(screen.getByRole('button', { name: '' }));
    expect(data).toEqual('java.util.List<ch.ivyteam.documentation.project.AddContactData>');
  });
});
