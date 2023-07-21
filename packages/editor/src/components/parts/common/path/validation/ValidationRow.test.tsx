import { render, screen } from 'test-utils';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { ValidationRow } from './ValidationRow';

describe('ValidationRow', () => {
  function renderTable(path: string) {
    const validations: InscriptionValidation[] = [{ path: 'test.bla', message: 'this is an error', severity: 'ERROR' }];
    render(
      <table>
        <tbody>
          <ValidationRow rowPathSuffix={path}>
            <td>content</td>
          </ValidationRow>
        </tbody>
      </table>,
      { wrapperProps: { validations } }
    );
  }

  test('empty path', async () => {
    renderTable('');
    expect(screen.getByRole('row')).not.toHaveClass('row-error');
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
