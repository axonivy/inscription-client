import { render, screen } from 'test-utils';
import { MessageText } from './Message.js';

describe('MessageText', () => {
  test('error', () => {
    render(<MessageText message={{ message: 'this is a error', severity: 'ERROR' }} />);
    const message = screen.getByTitle('this is a error');
    expect(message).toHaveClass('message');
    expect(message).toHaveAttribute('data-state', 'error');
  });

  test('warning', () => {
    render(<MessageText message={{ message: 'this is a warning', severity: 'WARNING' }} />);
    const message = screen.getByTitle('this is a warning');
    expect(message).toHaveClass('message');
    expect(message).toHaveAttribute('data-state', 'warning');
  });

  test('info', () => {
    render(<MessageText message={{ message: 'this is a info', severity: 'INFO' }} />);
    const message = screen.getByTitle('this is a info');
    expect(message).toHaveClass('message');
    expect(message).toHaveAttribute('data-state', 'info');
  });
});
