import { render, screen } from 'test-utils';
import { Message } from '../../message/Message';
import { ReorderRow } from './ReorderRow';

describe('ReorderRow', () => {
  function renderTable(message?: Message) {
    render(
      <table>
        <tbody>
          <ReorderRow id='f1' updateOrder={() => {}} message={message}>
            <td>content</td>
          </ReorderRow>
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
