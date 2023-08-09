import ResponsibleSelect from './ResponsibleSelect';
import { WfActivator, WfActivatorType } from '@axonivy/inscription-protocol';
import { render, screen, SelectUtil } from 'test-utils';

describe('ResponsibleSelect', () => {
  function renderSelect(options?: { type?: WfActivatorType; activator?: string; optionsFilter?: WfActivatorType[] }) {
    const responsible: WfActivator = { type: options?.type as WfActivatorType, activator: options?.activator ?? '' };
    const roles = [
      { id: 'Everybody', label: 'In this role is everyone' },
      { id: 'Employee', label: '' },
      { id: 'Teamleader', label: '' }
    ];
    render(<ResponsibleSelect responsible={responsible} updateResponsible={() => {}} optionFilter={options?.optionsFilter} />, {
      wrapperProps: { meta: { roles } }
    });
  }

  test('all options', async () => {
    renderSelect();
    await SelectUtil.assertValue('Role', { label: 'Responsible' });
    await SelectUtil.assertOptionsCount(4, { label: 'Responsible' });
  });

  test('no delete option', async () => {
    renderSelect({ optionsFilter: ['DELETE_TASK'] });
    await SelectUtil.assertOptionsCount(3, { label: 'Responsible' });
  });

  test('select for role option', async () => {
    renderSelect({ type: 'ROLE', activator: 'Teamleader' });
    await SelectUtil.assertValue('Role', { label: 'Responsible' });
    await SelectUtil.assertValue('Teamleader', { index: 1 });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('input for role attr option', async () => {
    renderSelect({ type: 'ROLE_FROM_ATTRIBUTE', activator: 'role activator' });
    await SelectUtil.assertValue('Role from Attr', { label: 'Responsible' });
    expect(screen.getByRole('textbox')).toHaveValue('role activator');
  });

  test('input for user attr option', async () => {
    renderSelect({ type: 'USER_FROM_ATTRIBUTE', activator: 'user activator' });
    await SelectUtil.assertValue('User from Attr', { label: 'Responsible' });
    expect(screen.getByRole('textbox')).toHaveValue('user activator');
  });

  test('nothing for delete option', async () => {
    renderSelect({ type: 'DELETE_TASK' });
    await SelectUtil.assertValue('Nobody & delete', { label: 'Responsible' });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
