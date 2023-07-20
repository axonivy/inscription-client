import { render, screen } from 'test-utils';
import { InscriptionValidation, SchemaPath } from '@axonivy/inscription-protocol';
import { ValidationRow } from './ValidationRow';

describe('ValidationRow', () => {
  function renderTable(path: string) {
    const validations: InscriptionValidation[] = [{ path: 'test.bla', message: 'hi', severity: 'ERROR' }];
    render(
      <table>
        <tbody>
          <ValidationRow path={path as SchemaPath} validations={validations}>
            <td>content</td>
          </ValidationRow>
        </tbody>
      </table>
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
    expect(screen.getByRole('row')).toHaveClass('row-error');
  });
});
