import React from 'react';
import { render, screen } from '@testing-library/react';
import { ClientContext, ClientContextInstance, DataContext, DataContextInstance } from '../../../context';
import ExpiryPart from './ExpiryPart';
import userEvent from '@testing-library/user-event';

describe('ResponsibleSelect', () => {
  function renderExpiryPart(options?: { timeout?: string }) {
    const data: DataContext = {
      data: { config: { task: { expiry: { timeout: options?.timeout } } } },
      initialData: {},
      updateData: () => {},
      validation: []
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
          <ExpiryPart />
        </DataContextInstance.Provider>
      </ClientContextInstance.Provider>
    );
  }

  test('expiry part only render empty timeout input', async () => {
    renderExpiryPart();
    const expiryCollapse = screen.getByRole('button', { name: /Expiry/ });
    await userEvent.click(expiryCollapse);

    const timeoutInput = screen.getByLabelText('Timeout');
    expect(timeoutInput).toHaveValue('');
    expect(screen.queryByText('Responsible')).not.toBeInTheDocument();
  });

  test('expiry part will render all', async () => {
    renderExpiryPart({ timeout: 'timeout' });
    const timeoutInput = screen.getByLabelText('Timeout');
    expect(timeoutInput).toHaveValue('timeout');
    expect(screen.getByText('Responsible')).toBeInTheDocument();
  });
});
