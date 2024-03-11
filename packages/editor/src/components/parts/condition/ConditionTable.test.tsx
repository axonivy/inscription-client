import { cloneObject, render, screen, userEvent } from 'test-utils';
import type { Condition } from './condition';
import ConditionTable from './ConditionTable';
import type { InscriptionType } from '@axonivy/inscription-protocol';
import { describe, test, expect } from 'vitest';

describe('ConditionTable', () => {
  const type: InscriptionType = { label: '', description: '', iconId: '', id: 'TaskEnd', impl: '', shortLabel: '', helpUrl: '' };
  const conditions: Condition[] = [
    { fid: 'f1', expression: 'in.accepted == false' },
    { fid: 'f6', expression: 'false', target: { name: 'Target name', pid: 'f7', type: type } },
    { fid: 'f8', expression: '' }
  ];
  function renderTable(): {
    data: () => Condition[];
  } {
    let data: Condition[] = cloneObject(conditions);
    render(<ConditionTable data={data} onChange={change => (data = change)} />);
    return {
      data: () => data
    };
  }

  test('can edit cells', async () => {
    renderTable();
    await userEvent.tab();
    const cellToEdit = screen.getByDisplayValue('in.accepted == false');
    await userEvent.click(cellToEdit);
    await userEvent.clear(cellToEdit);
    await userEvent.click(cellToEdit);
    expect(cellToEdit).toHaveFocus();
    await userEvent.type(cellToEdit, 'true{enter}');

    expect(cellToEdit).toHaveValue('true');
  });

  test('can remove unknown conditions', async () => {
    const view = renderTable();
    const firstRow = screen.getAllByRole('row')[1];
    await userEvent.click(firstRow);
    const removeButton = await screen.findByRole('button', { name: 'Remove row' });

    expect(removeButton).toBeInTheDocument();
    await userEvent.click(removeButton);
    const expectConditions = [];
    expectConditions.push(conditions[1], conditions[2]);
    expect(view.data()).toEqual(expectConditions);
  });
});
