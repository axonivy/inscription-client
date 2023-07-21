import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { render, screen } from 'test-utils';
import { PathFieldset } from './PathFieldset';

describe('PathFieldset', () => {
  function renderFieldset(validations: InscriptionValidation[]) {
    render(
      <PathFieldset label='Test Label' htmlFor='input' path='name'>
        <input id='input' />
      </PathFieldset>,
      { wrapperProps: { validations } }
    );
  }

  test('validaiton wrong path', () => {
    renderFieldset([{ path: 'test', message: 'this is a error', severity: 'ERROR' }]);
    expect(screen.queryByText('this is a error')).not.toBeInTheDocument();

    renderFieldset([{ path: 'test.name', message: 'this is a error', severity: 'ERROR' }]);
    expect(screen.queryByText('this is a error')).not.toBeInTheDocument();

    renderFieldset([{ path: 'name.test', message: 'this is a error', severity: 'ERROR' }]);
    expect(screen.queryByText('this is a error')).not.toBeInTheDocument();
  });

  test('validations visible', () => {
    renderFieldset([{ path: 'name', message: 'this is a error', severity: 'ERROR' }]);
    expect(screen.getByTitle('this is a error')).toHaveClass('message');
  });
});
