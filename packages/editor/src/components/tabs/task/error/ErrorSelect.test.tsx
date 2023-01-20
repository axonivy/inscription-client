import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ErrorSelect from './ErrorSelect';
import { ClientContext, ClientContextInstance, DataContext, DataContextInstance } from '../../../../context';
import userEvent from '@testing-library/user-event';

describe('ErrorSelect', () => {
  function renderSelect(options?: { error?: string }) {
    // @ts-ignore
    const data: DataContext = {
      data: { config: { task: { expiry: { error: options?.error } } } }
    };
    const client: ClientContext = {
      // @ts-ignore
      client: {
        expiryErrors() {
          return Promise.resolve([
            { id: 'error1', label: 'this is error1' },
            { id: 'bla', label: 'blablabla' }
          ]);
        }
      }
    };
    render(
      <ClientContextInstance.Provider value={client}>
        <DataContextInstance.Provider value={data}>
          <ErrorSelect />
        </DataContextInstance.Provider>
      </ClientContextInstance.Provider>
    );
  }

  test('error select will render', async () => {
    renderSelect();
    const select = screen.getByRole('combobox');
    await waitFor(() => expect(select).toHaveTextContent('↓'));
    await userEvent.click(select);
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  test('error select will render with given error', async () => {
    renderSelect({ error: 'error1' });
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveTextContent('this is error1'));
  });
});
