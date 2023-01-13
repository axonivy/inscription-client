import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ResponsibleSelect from './ResponsibleSelect';
import { Message } from '../../props';
import { ClientContext, ClientContextInstance, DataContext, DataContextInstance } from '../../../context';

describe('ResponsibleSelect', () => {
  function renderSelect(options: { type?: string; activator?: string; message?: Message }) {
    const data: DataContext = {
      data: { config: { task: { expiry: { responsible: { type: options.type, activator: options.activator } } } } },
      initialData: {},
      updateData: () => {},
      validation: []
    };
    const client: ClientContext = {
      // @ts-ignore
      client: {
        roles() {
          return Promise.resolve([
            { id: 'Everybody', label: 'In this role is everyone' },
            { id: 'Employee', label: '' },
            { id: 'Teamleader', label: '' }
          ]);
        }
      }
    };
    render(
      <ClientContextInstance.Provider value={client}>
        <DataContextInstance.Provider value={data}>
          <ResponsibleSelect />
        </DataContextInstance.Provider>
      </ClientContextInstance.Provider>
    );
  }

  test('responsible select will render select for role', async () => {
    renderSelect({ type: 'ROLE', activator: 'Teamleader' });
    const selects = screen.getAllByRole('combobox');
    expect(selects[0]).toHaveTextContent('Role');
    await waitFor(() => expect(selects[1]).toHaveTextContent('Teamleader'));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('responsible select will render input for role attr option', async () => {
    renderSelect({ type: 'ROLE_FROM_ATTRIBUTE', activator: 'role activator' });
    expect(screen.getByRole('combobox')).toHaveTextContent('Role from Attr');
    expect(screen.getByRole('textbox')).toHaveValue('role activator');
  });

  test('responsible select will render input for user attr option', async () => {
    renderSelect({ type: 'USER_FROM_ATTRIBUTE', activator: 'user activator' });
    expect(screen.getByRole('combobox')).toHaveTextContent('User from Attr');
    expect(screen.getByRole('textbox')).toHaveValue('user activator');
  });

  test('responsible select will render nothing for delete option', async () => {
    renderSelect({ type: 'DELETE_TASK' });
    expect(screen.getByRole('combobox')).toHaveTextContent('Nobody & delete');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
