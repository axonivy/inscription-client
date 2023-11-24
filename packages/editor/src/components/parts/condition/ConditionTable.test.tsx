import { cloneObject, render, screen, userEvent } from 'test-utils';
import type { Condition } from './condition.js';
import ConditionTable from './ConditionTable.js';
import type { InscriptionType } from '@axonivy/inscription-protocol';

describe('ConditionTable', () => {
  const type: InscriptionType = { label: '', description: '', iconId: '', id: 'TaskEnd', impl: '', shortLabel: '' };
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
    const view = renderTable();
    await userEvent.default.tab();
    expect(screen.getByDisplayValue('in.accepted == false')).toHaveFocus();
    await userEvent.default.keyboard('true');
    await userEvent.default.tab();

    const expectConditions = cloneObject(conditions);
    expectConditions[0].expression = 'true';
    expect(view.data()).toEqual(expectConditions);
  });

  test('can remove unknown conditions', async () => {
    const view = renderTable();
    const removeBtns = screen.getAllByRole('button', { name: 'Remove unknown condition' });
    expect(removeBtns).toHaveLength(2);
    await userEvent.default.click(removeBtns[0]);
    const expectConditions = [];
    expectConditions.push(conditions[1], conditions[2]);
    expect(view.data()).toEqual(expectConditions);
  });
});
