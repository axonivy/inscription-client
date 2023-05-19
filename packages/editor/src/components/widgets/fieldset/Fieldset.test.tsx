import { Message } from '../../props/message';
import Fieldset, { FieldsetData } from './Fieldset';
import { render, screen, userEvent } from 'test-utils';
import { FieldsetControl } from './Fieldset';
import { IvyIcons } from '@axonivy/editor-icons';

describe('Fieldset', () => {
  function renderFieldset(options?: { controls?: FieldsetControl[]; data?: FieldsetData<string>; message?: Message }) {
    render(
      <Fieldset label='Test Label' htmlFor='input' controls={options?.controls} data={options?.data} message={options?.message}>
        <input id='input' />
      </Fieldset>
    );
  }

  test('fieldset will render', () => {
    renderFieldset();
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });

  test('fieldset will render message', () => {
    renderFieldset({ message: { message: 'this is a error', severity: 'ERROR' } });
    expect(screen.getByText('this is a error')).toHaveClass('fieldset-message', 'fieldset-error');

    renderFieldset({ message: { message: 'this is a warning', severity: 'WARNING' } });
    expect(screen.getByText('this is a warning')).toHaveClass('fieldset-message', 'fieldset-warning');

    renderFieldset({ message: { message: 'this is a info', severity: 'INFO' } });
    expect(screen.getByText('this is a info')).toHaveClass('fieldset-message', 'fieldset-info');
  });

  test('fieldset reset button', async () => {
    let resetTrigger = false;
    const resetData = () => (resetTrigger = true);
    renderFieldset({ data: { data: 'value', initData: 'value', updateData: resetData } });
    expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();

    renderFieldset({ data: { data: 'value', initData: '', updateData: resetData } });
    const resetBtn = screen.getByRole('button', { name: 'Reset' });
    expect(resetBtn).toBeInTheDocument();
    await userEvent.click(resetBtn);
    expect(resetTrigger).toBeTruthy();
  });

  test('fieldset control buttons', async () => {
    let btnTrigger = false;
    const action = () => (btnTrigger = true);
    const control1: FieldsetControl = { label: 'Btn1', icon: IvyIcons.ActivitiesGroup, action };
    const control2: FieldsetControl = { label: 'Btn2', icon: IvyIcons.Add, action, active: true };

    renderFieldset({ controls: [control1, control2] });
    const btn1 = screen.getByRole('button', { name: 'Btn1' });
    await userEvent.click(btn1);
    expect(btnTrigger).toBeTruthy();

    const btn2 = screen.getByRole('button', { name: 'Btn2' });
    expect(btn2).toHaveAttribute('data-state', 'active');
  });
});
