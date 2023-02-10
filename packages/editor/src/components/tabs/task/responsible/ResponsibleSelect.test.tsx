import ResponsibleSelect from './ResponsibleSelect';
import { Responsible, ResponsibleType } from '@axonivy/inscription-protocol';
import { render, screen, SelectUtil } from 'test-utils';

describe('ResponsibleSelect', () => {
  function renderSelect(options?: { type?: ResponsibleType; activator?: string; optionsFilter?: ResponsibleType[] }) {
    const responsible: Responsible = { type: options?.type as ResponsibleType, activator: options?.activator ?? '' };
    const roles = [
      { id: 'Everybody', label: 'In this role is everyone' },
      { id: 'Employee', label: '' },
      { id: 'Teamleader', label: '' }
    ];
    render(
      <ResponsibleSelect
        responsible={responsible}
        updateResponsible={{ updateType: () => {}, updateActivator: () => {} }}
        optionFilter={options?.optionsFilter}
      />,
      { wrapperProps: { meta: { roles } } }
    );
  }

  test('responsible select will render all options', async () => {
    renderSelect();
    await SelectUtil.assertValue('Role', 'Responsible');
    await SelectUtil.assertOptionsCount(4, 'Responsible');
  });

  test('responsible select will render no delete option', async () => {
    renderSelect({ optionsFilter: ['DELETE_TASK'] });
    await SelectUtil.assertOptionsCount(3, 'Responsible');
  });

  test('responsible select will render select for role with default option', async () => {
    renderSelect({ type: 'ROLE' });
    await SelectUtil.assertValue('Role', 'Responsible');
    await SelectUtil.assertValue('Everybody', 'Role');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('responsible select will render select for role', async () => {
    renderSelect({ type: 'ROLE', activator: 'Teamleader' });
    await SelectUtil.assertValue('Role', 'Responsible');
    await SelectUtil.assertValue('Teamleader', 'Role');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('responsible select will render input for role attr option', async () => {
    renderSelect({ type: 'ROLE_FROM_ATTRIBUTE', activator: 'role activator' });
    await SelectUtil.assertValue('Role from Attr', 'Responsible');
    expect(screen.getByRole('textbox')).toHaveValue('role activator');
  });

  test('responsible select will render input for user attr option', async () => {
    renderSelect({ type: 'USER_FROM_ATTRIBUTE', activator: 'user activator' });
    await SelectUtil.assertValue('User from Attr', 'Responsible');
    expect(screen.getByRole('textbox')).toHaveValue('user activator');
  });

  test('responsible select will render nothing for delete option', async () => {
    renderSelect({ type: 'DELETE_TASK' });
    await SelectUtil.assertValue('Nobody & delete', 'Responsible');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
