import { render, screen } from 'test-utils';
import type { InscriptionValidation } from '@axonivy/inscription-protocol';
import { describe, test, expect } from 'vitest';
import { SelectableValidationRow } from './ValidationRow';
import type { Row } from '@tanstack/react-table';

describe('ValidationRow', () => {
  function renderTable(path: string) {
    const validations: InscriptionValidation[] = [{ path: 'test.bla', message: 'this is an error', severity: 'ERROR' }];
    render(
      <table>
        <tbody>
          <SelectableValidationRow
            row={{ getIsSelected: () => false } as Row<object>}
            colSpan={3}
            rowPathSuffix={path}
            title='this is a title'
          >
            <td>content</td>
          </SelectableValidationRow>
        </tbody>
      </table>,
      { wrapperProps: { validations } }
    );
  }

  test('empty path', async () => {
    renderTable('');
    expect(screen.getByRole('row')).not.toHaveClass('row-error');
  });

  test('title', async () => {
    renderTable('');
    expect(screen.getByRole('row')).toHaveAttribute('title', 'this is a title');
  });

  test('not matching path', async () => {
    renderTable('test');
    expect(screen.getByRole('row')).not.toHaveClass('row-error');
  });

  test('matching path', async () => {
    renderTable('test.bla');
    const rows = screen.getAllByRole('row');
    expect(rows[0]).toHaveClass('row-error');
    expect(rows[1]).toHaveClass('row-message');
    expect(rows[1]).toHaveTextContent('this is an error');
  });
});
