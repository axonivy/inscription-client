import InscriptionEditor from './InscriptionEditor';
import { TabProps } from '../props/tab';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import { render, screen, userEvent } from 'test-utils';

describe('Editor', () => {
  const ErrorWidget = () => {
    throw new Error('this is an exception');
  };

  function renderEditor(options: { headerState?: InscriptionValidation[] } = {}) {
    const tabs: TabProps[] = [
      { name: 'Name', content: <h1>Name</h1> },
      { name: 'Call', content: <h1>Call</h1> },
      { name: 'Result', content: <ErrorWidget /> }
    ];
    render(<InscriptionEditor icon={IvyIcons.Add} tabs={tabs} />, {
      wrapperProps: { validation: options.headerState, editor: { title: 'Test Editor' } }
    });
  }

  test('editor will render', () => {
    renderEditor();
    expect(screen.getByText(/Test Editor/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Name' })).toHaveAttribute('data-state', 'closed');
  });

  test('editor show state', () => {
    const headerState: InscriptionValidation[] = [
      { path: '', message: 'this is an error', severity: 'error' },
      { path: '', message: 'this is an warning', severity: 'warning' }
    ];
    renderEditor({ headerState: headerState });
    expect(screen.getByText(/this is an error/i)).toHaveClass('header-status', 'message-error');
    expect(screen.getByText(/this is an warning/i)).toHaveClass('header-status', 'message-warning');
  });

  describe('Editor with errors', () => {
    const original = console.error;

    beforeEach(() => {
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = original;
    });

    test('editor tab render error', async () => {
      renderEditor();
      await userEvent.click(screen.getByRole('button', { name: /Result/ }));
      expect(screen.getByRole('alert')).toHaveTextContent('this is an exception');
      expect(console.error).toHaveBeenCalled();
    });
  });
});
