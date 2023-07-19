import Fieldset from './Fieldset';
import { render, screen, userEvent } from 'test-utils';
import { IvyIcons } from '@axonivy/editor-icons';
import { FieldsetControl } from './fieldset-control';
import { Message } from '../../props';

describe('Fieldset', () => {
  function renderFieldset(label?: string, options?: { controls?: FieldsetControl[]; message?: Message }) {
    render(
      <Fieldset label={label} htmlFor='input' controls={options?.controls} message={options?.message}>
        <input id='input' />
      </Fieldset>
    );
  }

  test('render', () => {
    renderFieldset('label');
    expect(screen.getByLabelText('label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAccessibleName('label');
  });

  test('no label', () => {
    renderFieldset();
    expect(screen.getByRole('textbox')).toHaveAccessibleName('');
  });

  test('message', () => {
    renderFieldset('label', { message: { message: 'this is a error', severity: 'ERROR' } });
    expect(screen.getByText('this is a error')).toHaveClass('fieldset-message', 'fieldset-error');

    renderFieldset('label', { message: { message: 'this is a warning', severity: 'WARNING' } });
    expect(screen.getByText('this is a warning')).toHaveClass('fieldset-message', 'fieldset-warning');

    renderFieldset('label', { message: { message: 'this is a info', severity: 'INFO' } });
    expect(screen.getByText('this is a info')).toHaveClass('fieldset-message', 'fieldset-info');
  });

  test('control buttons', async () => {
    let btnTrigger = false;
    const action = () => (btnTrigger = true);
    const control1: FieldsetControl = { label: 'Btn1', icon: IvyIcons.ActivitiesGroup, action };
    const control2: FieldsetControl = { label: 'Btn2', icon: IvyIcons.Add, action, active: true };

    renderFieldset('label', { controls: [control1, control2] });
    const btn1 = screen.getByRole('button', { name: 'Btn1' });
    await userEvent.click(btn1);
    expect(btnTrigger).toBeTruthy();

    const btn2 = screen.getByRole('button', { name: 'Btn2' });
    expect(btn2).toHaveAttribute('data-state', 'active');
  });
});
