import type { ValidationResult } from '@axonivy/inscription-protocol';
import { render, screen } from 'test-utils';
import { describe, test, expect } from 'vitest';
import { InscriptionEditor } from './InscriptionEditor';

describe('Editor', () => {
  const renderEditor = (options: { headerState?: ValidationResult[] } = {}) =>
    render(<InscriptionEditor showOutline={false} setShowOutline={() => {}} />, {
      wrapperProps: { validations: options.headerState, editor: { title: 'Test Editor' } }
    });

  test('editor show messages', () => {
    const headerState: ValidationResult[] = [
      { path: '', message: 'this is an error', severity: 'ERROR' },
      { path: '', message: 'this is an warning', severity: 'WARNING' }
    ];
    renderEditor({ headerState: headerState });
    expect(screen.getByTitle(/this is an error/i)).toHaveAttribute('data-state', 'error');
    expect(screen.getByTitle(/this is an warning/i)).toHaveAttribute('data-state', 'warning');
  });

  test('editor do not show messages with path', () => {
    const headerState: ValidationResult[] = [{ path: 'output', message: 'message on output', severity: 'ERROR' }];
    renderEditor({ headerState: headerState });
    expect(screen.queryByTitle(/message on output/i)).not.toBeInTheDocument();
  });

  test('no outline', () => {
    renderEditor();
    expect(screen.getByText('Test Editor')).toBeInTheDocument();
    expect(screen.queryByRole('switch')).not.toBeInTheDocument();
  });

  test('outline', async () => {
    const view = renderEditor();
    expect(screen.getByText('Test Editor')).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: 'test node' })).not.toBeInTheDocument();

    view.rerender(
      <InscriptionEditor
        outline={{ outline: [{ id: 'test', title: 'test node', children: [] }] }}
        showOutline={true}
        setShowOutline={() => {}}
      />
    );
    expect(screen.getByRole('row', { name: 'test node' })).toBeInTheDocument();
  });
});
