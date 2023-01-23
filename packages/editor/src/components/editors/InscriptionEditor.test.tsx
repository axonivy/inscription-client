import React from 'react';
import { render, screen } from '@testing-library/react';
import InscriptionEditor from './InscriptionEditor';
import { TabProps } from '../props/tab';
import { DataContext, DataContextInstance, DEFAULT_EDITOR_CONTEXT, EditorContextInstance } from '../../context';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';

describe('Editor', () => {
  function renderEditor(options: { headerState?: InscriptionValidation[] } = {}) {
    const tabs: TabProps[] = [
      { name: 'Name', state: 'empty', content: <h1>Name</h1> },
      { name: 'Call', state: 'configured', content: <h1>Call</h1> },
      { name: 'Result', state: 'configured', content: <h1>Result</h1> }
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
});
