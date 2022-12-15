import { render, screen } from '@testing-library/react';
import { Message, MessageSeverity } from '../../props/message';
import LabelInput from './LabelInput';

describe('LabelInput', () => {
  function renderLabelInput(message?: Message) {
    render(
      <LabelInput label='Test Label' htmlFor='input' message={message}>
        <input id='input' />
      </LabelInput>
    );
  }

  test('label input will render', () => {
    renderLabelInput();
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });

  test('label input will render message', () => {
    renderLabelInput({ field: 'input', message: 'this is a error', severity: MessageSeverity.ERROR });
    expect(screen.getByText('this is a error')).toHaveClass('input-message', 'input-error');

    renderLabelInput({ field: 'input', message: 'this is a warning', severity: MessageSeverity.WARNING });
    expect(screen.getByText('this is a warning')).toHaveClass('input-message', 'input-warning');

    renderLabelInput({ field: 'input', message: 'this is a info', severity: MessageSeverity.INFO });
    expect(screen.getByText('this is a info')).toHaveClass('input-message', 'input-info');
  });
});
