import React from 'react';
import { render, screen } from '@testing-library/react';
import PrioritySelect from './PrioritySelect';
import { DataContext, DataContextInstance } from '../../../../context';
import userEvent from '@testing-library/user-event';
import { Priority, PriorityLevel } from '@axonivy/inscription-protocol';

describe('PrioritySelect', () => {
  function renderSelect(options?: { level?: string; script?: string; expiry?: boolean }) {
    const priority: Priority = { level: options?.level as PriorityLevel, script: options?.script };
    // @ts-ignore
    const data: DataContext = {
      data: { config: { task: { priority: priority, expiry: { priority: priority } } } }
    };
    render(
      <DataContextInstance.Provider value={data}>
        <PrioritySelect expiry={options?.expiry} />
      </DataContextInstance.Provider>
    );
  }

  test('priority select will render with default option', async () => {
    renderSelect();
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveTextContent('Normal');
    expect(screen.getAllByRole('option')).toHaveLength(5);
  });

  test('priority select will render for expiry option', async () => {
    renderSelect({ expiry: true });
    expect(screen.getByRole('combobox')).toHaveTextContent('Normal');
  });

  test('priority select input will not render', async () => {
    renderSelect({ level: 'LOW' });
    expect(screen.getByRole('combobox')).toHaveTextContent('Low');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('priority select input will render for script option', async () => {
    renderSelect({ level: 'SCRIPT', script: 'this is a script' });
    expect(screen.getByRole('combobox')).toHaveTextContent('Script');
    expect(screen.getByRole('textbox')).toHaveValue('this is a script');
  });
});
