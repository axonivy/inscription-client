import React from 'react';
import { render, screen } from '@testing-library/react';
import { ClientContext, ClientContextInstance, DataContextInstance } from '../../../context';
import TaskPart from './TaskPart';
import userEvent from '@testing-library/user-event';
import { DEFAULT_TASK } from '@axonivy/inscription-protocol';

describe('TaskPart', () => {
  function renderTaskPart(showPersist?: boolean) {
    // @ts-ignore
    const data: DataContext = {
      data: { config: { task: DEFAULT_TASK } }
    };
    const client: ClientContext = {
      // @ts-ignore
      client: {
        roles() {
          return Promise.resolve([]);
        },
        expiryErrors() {
          return Promise.resolve([]);
        }
      }
    };
    render(
      <ClientContextInstance.Provider value={client}>
        <DataContextInstance.Provider value={data}>
          <TaskPart showPersist={showPersist} />
        </DataContextInstance.Provider>
      </ClientContextInstance.Provider>
    );
  }

  test('task part render responsible and skip task list option', async () => {
    renderTaskPart();
    const optionCollapse = screen.getByRole('button', { name: /Option/ });
    await userEvent.click(optionCollapse);

    expect(screen.getByText('Responsible')).toBeInTheDocument();
    expect(screen.getByText('Skip Tasklist')).toBeInTheDocument();
    expect(screen.getByText('Delay')).toBeInTheDocument();
    expect(screen.queryByText(/Persist/)).not.toBeInTheDocument();
  });

  test('task part render persist option', async () => {
    renderTaskPart(true);
    const optionCollapse = screen.getByRole('button', { name: /Option/ });
    await userEvent.click(optionCollapse);

    expect(screen.getByText(/Persist/)).toBeInTheDocument();
    expect(screen.queryByText('Responsible')).not.toBeInTheDocument();
    expect(screen.queryByText('Skip Tasklist')).not.toBeInTheDocument();
    expect(screen.queryByText('Delay')).not.toBeInTheDocument();
  });
});
