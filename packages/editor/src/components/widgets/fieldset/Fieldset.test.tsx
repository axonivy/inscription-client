import { Message } from '../../props/message';
import Fieldset, { useFieldset } from './Fieldset';
import { render, renderHook, screen, userEvent } from 'test-utils';
import { FieldsetControl } from './Fieldset';
import { IvyIcons } from '@axonivy/editor-icons';

describe('Fieldset', () => {
  function renderFieldset(options?: { controls?: FieldsetControl[]; message?: Message }) {
    render(
      <Fieldset label='Test Label' htmlFor='input' controls={options?.controls} message={options?.message}>
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

  test('useFieldset hook', () => {
    const { result: fieldset1 } = renderHook(() => useFieldset());
    const { result: fieldset2 } = renderHook(() => useFieldset());
    expect(fieldset1).not.toEqual(fieldset2);
    expect(fieldset1.current).toEqual(fieldsetHookReturnValue(0));
    expect(fieldset2.current).toEqual(fieldsetHookReturnValue(1));
  });

  function fieldsetHookReturnValue(index: number) {
    return {
      inputProps: {
        'aria-labelledby': `fieldset-${index}-label`,
        id: `fieldset-${index}-input`
      },
      labelProps: {
        htmlFor: `fieldset-${index}-input`,
        id: `fieldset-${index}-label`
      }
    };
  }
});
