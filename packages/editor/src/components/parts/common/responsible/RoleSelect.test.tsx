import { render, SelectUtil } from 'test-utils';
import RoleSelect from './RoleSelect';

describe('RoleSelect', () => {
  function renderSelect(activator?: string) {
    const roles = [
      { id: 'Everybody', label: 'In this role is everyone' },
      { id: 'Employee', label: '' },
      { id: 'Teamleader', label: '' }
    ];
    render(<RoleSelect value={activator} onChange={() => {}} />, {
      wrapperProps: { meta: { roles } }
    });
  }

  test('default option', async () => {
    renderSelect();
    await SelectUtil.assertValue('Everybody');
  });

  test('unknown option', async () => {
    renderSelect('unknown');
    await SelectUtil.assertValue('unknown');
  });

  test('selected option', async () => {
    renderSelect('Teamleader');
    await SelectUtil.assertValue('Teamleader');
  });
});
