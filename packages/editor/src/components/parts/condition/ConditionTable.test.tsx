import { render, screen, userEvent } from 'test-utils';
import { Condition } from './condition';
import ConditionTable from './ConditionTable';
import { InscriptionType } from '@axonivy/inscription-protocol';

describe('ConditionTable', () => {
  const type: InscriptionType = { label: '', description: '', iconId: '', id: 'TaskEnd', impl: '', shortLabel: '' };
  const conditions: Condition[] = [
    { fid: 'f1', expression: 'in.accepted == false' },
    { fid: 'f6', expression: 'false', target: { name: 'Target name', pid: 'f7', type: type } },
    { fid: 'f8', expression: '' }
  ];
  function renderTable(): {
    data: () => Condition[];
    rerender: () => void;
  } {
    let data: Condition[] = conditions;
    const view = render(<ConditionTable data={data} onChange={change => (data = change)} />);
    return {
      data: () => data,
      // eslint-disable-next-line testing-library/no-unnecessary-act
      rerender: () => view.rerender(<ConditionTable data={data} onChange={change => (data = change)} />)
    };
  }

  test('table can edit cells', async () => {
    const view = renderTable();
    await userEvent.tab();
    expect(screen.getByDisplayValue('in.accepted == false')).toHaveFocus();
    await userEvent.keyboard('true');
    await userEvent.tab();
    await userEvent.keyboard('test');
    await userEvent.tab();

    const expectConditions = [...conditions];
    expectConditions[0].expression = 'true';
    expectConditions[1].expression = 'test';
    expect(view.data()).toEqual(expectConditions);
  });
});
