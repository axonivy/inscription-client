import type { ValidationResult } from '@axonivy/inscription-protocol';
import { render, screen } from 'test-utils';
import { PathFieldset } from './PathFieldset';
import { describe, test, expect } from 'vitest';
import { Input } from '@axonivy/ui-components';

describe('PathFieldset', () => {
  function renderFieldset(validations: ValidationResult[]) {
    render(
      <PathFieldset label='Test Label' path='name'>
        <Input />
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
    expect(screen.getByTitle('this is a error')).toHaveClass('ui-message');
  });
});
