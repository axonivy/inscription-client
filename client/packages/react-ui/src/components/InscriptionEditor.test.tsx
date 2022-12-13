import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InscriptionEditor from './InscriptionEditor';
import { Message, MessageSeverity } from './props/message';
import { TabProps, TabState } from './props/tab';

describe('Editor', () => {
  function renderEditor(options: { headerState?: Message[] } = {}) {
    const tabs: TabProps[] = [
      { name: 'Name', state: TabState.EMPTY, content: <h1>Name</h1> },
      { name: 'Call', state: TabState.CONFIGURED, content: <h1>Call</h1> },
      { name: 'Result', state: TabState.CONFIGURED, content: <h1>Result</h1> }
    ];
    render(<InscriptionEditor title='Test Editor' tabs={tabs} headerState={options.headerState ?? []} />);
  }

  test('editor will render', () => {
    renderEditor();
    expect(screen.getByText(/Test Editor/i)).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');
  });

  test('editor show state', () => {
    const headerState: Message[] = [
      { field: 'error', message: 'this is an error', severity: MessageSeverity.ERROR },
      { field: 'warning', message: 'this is an warning', severity: MessageSeverity.WARNING }
    ];
    renderEditor({ headerState: headerState });
    expect(screen.getByText(/this is an error/i)).toHaveClass('header-status', 'message-error');
    expect(screen.getByText(/this is an warning/i)).toHaveClass('header-status', 'message-warning');
  });

  test('editor switch tab', async () => {
    renderEditor();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');

    const callTab = screen.getByRole('tab', { name: 'Call' });
    await userEvent.click(callTab);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Call');

    const resultTab = screen.getByRole('tab', { name: 'Result' });
    await userEvent.click(resultTab);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Result');

    const nameTab = screen.getByRole('tab', { name: 'Name' });
    await userEvent.click(nameTab);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');
  });

  test('editor switch tab by keyboard', async () => {
    renderEditor();

    const nameTab = screen.getByRole('tab', { name: 'Name' });
    const callTab = screen.getByRole('tab', { name: 'Call' });
    const resultTab = screen.getByRole('tab', { name: 'Result' });

    await userEvent.tab();
    expect(nameTab).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');

    await userEvent.keyboard('[ArrowRight]');
    expect(callTab).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Call');

    await userEvent.keyboard('[ArrowRight]');
    expect(resultTab).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Result');

    await userEvent.keyboard('[ArrowLeft]');
    expect(callTab).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Call');
  });
});
