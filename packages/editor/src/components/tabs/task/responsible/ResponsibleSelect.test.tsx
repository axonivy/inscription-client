import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ResponsibleSelect from './ResponsibleSelect';
import { ClientContext, ClientContextInstance } from '../../../../context';
import userEvent from '@testing-library/user-event';
import { Responsible, ResponsibleType } from '@axonivy/inscription-protocol';

describe('ResponsibleSelect', () => {
  function renderSelect(options?: { type?: string; activator?: string; optionsFilter?: string[] }) {
    const responsible: Responsible = { type: options?.type as ResponsibleType, activator: options?.activator };
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
        <ResponsibleSelect
          responsible={responsible}
          updateResponsible={{ updateType: () => {}, updateActivator: () => {} }}
          optionFilter={options?.optionsFilter}
        />
      </ClientContextInstance.Provider>
    );
  }

  test('responsible select will render all options', async () => {
    renderSelect();
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  test('responsible select will render no delete option', async () => {
    renderSelect({ optionsFilter: [ResponsibleType.DELETE_TASK] });
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  test('responsible select will render select for role with default option', async () => {
    renderSelect({ type: 'ROLE' });
    const selects = screen.getAllByRole('combobox');
    expect(selects[0]).toHaveTextContent('Role');
    await waitFor(() => expect(selects[1]).toHaveTextContent('Everybody'));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('responsible select will render select for role', async () => {
    renderSelect({ type: 'ROLE', activator: 'Teamleader' });
    const selects = screen.getAllByRole('combobox');
    expect(selects[0]).toHaveTextContent('Role');
    await waitFor(() => expect(selects[1]).toHaveTextContent('Teamleader'));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('responsible select will render input for role attr option', async () => {
    renderSelect({ type: 'ROLE_FROM_ATTRIBUTE', activator: 'role activator' });
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveTextContent('Role from Attr'));
    expect(screen.getByRole('textbox')).toHaveValue('role activator');
  });

  test('responsible select will render input for user attr option', async () => {
    renderSelect({ type: 'USER_FROM_ATTRIBUTE', activator: 'user activator' });
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveTextContent('User from Attr'));
    expect(screen.getByRole('textbox')).toHaveValue('user activator');
  });

  test('responsible select will render nothing for delete option', async () => {
    renderSelect({ type: 'DELETE_TASK' });
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveTextContent('Nobody & delete'));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
