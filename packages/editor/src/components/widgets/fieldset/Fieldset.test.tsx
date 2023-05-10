import { Message } from '../../props/message';
import Fieldset from './Fieldset';
import { render, screen } from 'test-utils';

describe('Fieldset', () => {
  function renderLabelInput(message?: Message) {
    render(
      <Fieldset label='Test Label' htmlFor='input' message={message}>
        <input id='input' />
      </Fieldset>
    );
  }

  test('fieldset will render', () => {
    renderLabelInput();
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });

  test('fieldset will render message', () => {
    renderLabelInput({ message: 'this is a error', severity: 'error' });
    expect(screen.getByText('this is a error')).toHaveClass('fieldset-message', 'fieldset-error');

    renderLabelInput({ message: 'this is a warning', severity: 'warning' });
    expect(screen.getByText('this is a warning')).toHaveClass('fieldset-message', 'fieldset-warning');

    renderLabelInput({ message: 'this is a info', severity: 'info' });
    expect(screen.getByText('this is a info')).toHaveClass('fieldset-message', 'fieldset-info');
  });
});
