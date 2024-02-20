import { render, screen } from 'test-utils';
import type { Message } from '../../message/Message';
import { describe, test, expect } from 'vitest';
import { MessageRow } from './MessageRow';

describe('MessageRow', () => {
  function renderTable(message?: Message) {
    render(
      <table>
        <tbody>
          <MessageRow colSpan={3} message={message} />
        </tbody>
      </table>
    );
  }

  test('no message', async () => {
    renderTable();
    expect(screen.queryByRole('row')).toBeNull();
  });

  test('message error', async () => {
    renderTable({ message: 'hi', severity: 'ERROR' });
    const rows = screen.getAllByRole('row');
    expect(rows[0]).toHaveClass('row row-message message-error');
    expect(rows[0]).toHaveTextContent('hi');
  });

  test('message warning', async () => {
    renderTable({ message: 'hi', severity: 'WARNING' });
    const rows = screen.getAllByRole('row');
    expect(rows[0]).toHaveClass('row row-message message-warning');
    expect(rows[0]).toHaveTextContent('hi');
  });

  test('message message', async () => {
    renderTable({ message: 'hi', severity: 'INFO' });
    const rows = screen.getAllByRole('row');
    expect(rows[0]).toHaveClass('row row-message message-info');
    expect(rows[0]).toHaveTextContent('hi');
  });
});
