import { render, screen } from 'test-utils';
import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { ValidationRow } from './ValidationRow';

describe('ValidationRow', () => {
  function renderTable(path: string) {
    const validations: InscriptionValidation[] = [{ path: 'test.bla', message: 'hi', severity: 'ERROR' }];
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
    expect(screen.getByRole('row')).toHaveClass('row-error');
  });
});
