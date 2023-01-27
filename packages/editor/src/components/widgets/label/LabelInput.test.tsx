import React from 'react';
import { render, screen } from '@testing-library/react';
import { Message } from '../../props/message';
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
    renderLabelInput({ message: 'this is a error', severity: 'error' });
    expect(screen.getByText('this is a error')).toHaveClass('input-message', 'input-error');

    renderLabelInput({ message: 'this is a warning', severity: 'warning' });
    expect(screen.getByText('this is a warning')).toHaveClass('input-message', 'input-warning');

    renderLabelInput({ message: 'this is a info', severity: 'info' });
    expect(screen.getByText('this is a info')).toHaveClass('input-message', 'input-info');
  });
});
