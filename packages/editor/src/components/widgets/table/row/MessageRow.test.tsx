import { render, screen } from 'test-utils';
import { MessageRow } from './MessageRow.js';
import type { Message } from '../../message/Message.js';

describe('MessageRow', () => {
  function renderTable(message?: Message) {
    render(
      <table>
        <tbody>
          <MessageRow message={message}>
            <td>content</td>
          </MessageRow>
        </tbody>
      </table>
    );
  }

  test('no message', async () => {
    renderTable();
    expect(screen.getByRole('row')).not.toHaveClass('row-error');
  });

  test('message', async () => {
    renderTable({ message: 'hi', severity: 'ERROR' });
    const rows = screen.getAllByRole('row');
    expect(rows[0]).toHaveClass('row-error');
    expect(rows[1]).toHaveClass('row-message');
    expect(rows[1]).toHaveTextContent('hi');
  });
});
