import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InscriptionEditor from './InscriptionEditor';
import { TabProps } from '../props/tab';
import { DataContext, DataContextInstance, DEFAULT_EDITOR_CONTEXT, EditorContextInstance } from '../../context';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';

const ErrorWidget = () => {
  throw new Error('this is an exception');
};

describe('Editor', () => {
  function renderEditor(options: { headerState?: InscriptionValidation[] } = {}) {
    const tabs: TabProps[] = [
      { name: 'Name', content: <h1>Name</h1> },
      { name: 'Call', content: <h1>Call</h1> },
      { name: 'Result', content: <ErrorWidget /> }
    ];
    // @ts-ignore
    const data: DataContext = {
      data: { config: {} },
      validation: options.headerState ?? []
    };
    const editorContext = DEFAULT_EDITOR_CONTEXT;
    editorContext.type.shortLabel = 'Test Editor';
    render(
      <EditorContextInstance.Provider value={editorContext}>
        <DataContextInstance.Provider value={data}>
          <InscriptionEditor icon={IvyIcons.Add} tabs={tabs} />
        </DataContextInstance.Provider>
      </EditorContextInstance.Provider>
    );
  }

  test('editor will render', () => {
    renderEditor();
    expect(screen.getByText(/Test Editor/i)).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');
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

  test('editor tab render error', async () => {
    renderEditor();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');

    await userEvent.click(screen.getByRole('tab', { name: /Result/ }));
    expect(screen.getByRole('alert')).toHaveTextContent('this is an exception');

    await userEvent.click(screen.getByRole('tab', { name: /Name/ }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');
  });
});
