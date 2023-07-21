import { render, screen } from 'test-utils';
import { MessageRow } from './MessageRow';
import { Message } from '../../message/Message';

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
    expect(screen.getByRole('row')).toHaveClass('row-error');
  });
});
