import { render, screen } from 'test-utils';
import type { Message } from '../../message/Message';
import { SelectableReorderRow } from './ReorderRow';
import { describe, test, expect } from 'vitest';
import type { Row } from '@tanstack/react-table';

describe('ReorderRow', () => {
  function renderTable(message?: Message) {
    render(
      <table>
        <tbody>
          <SelectableReorderRow
            colSpan={1}
            row={{ getIsSelected: () => {} } as Row<object>}
            id='f1'
            updateOrder={() => {}}
            message={message}
          >
            <td>content</td>
          </SelectableReorderRow>
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
