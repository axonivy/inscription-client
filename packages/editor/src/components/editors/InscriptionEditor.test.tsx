import InscriptionEditor from './InscriptionEditor';
import type { PartProps } from './part/usePart';
import type { InscriptionValidation } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import { render, screen, userEvent } from 'test-utils';
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';

describe('Editor', () => {
  const ErrorWidget = () => {
    throw new Error('this is an exception');
  };

  function renderEditor(options: { headerState?: InscriptionValidation[] } = {}) {
    const parts: PartProps[] = [
      { name: 'Name', content: <h1>Name</h1>, reset: { dirty: false, action: () => {} }, state: { state: 'empty', validations: [] } },
      { name: 'Call', content: <h1>Call</h1>, reset: { dirty: false, action: () => {} }, state: { state: 'empty', validations: [] } },
      { name: 'Result', content: <ErrorWidget />, reset: { dirty: false, action: () => {} }, state: { state: 'empty', validations: [] } }
    ];
    render(<InscriptionEditor icon={IvyIcons.Plus} parts={parts} />, {
      wrapperProps: { validations: options.headerState, editor: { title: 'Test Editor' } }
    });
  }

  test('editor will render', () => {
    renderEditor();
    expect(screen.getByText(/Test Editor/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Name' })).toHaveAttribute('data-state', 'closed');
  });

  test('editor show messages', () => {
    const headerState: InscriptionValidation[] = [
      { path: '', message: 'this is an error', severity: 'ERROR' },
      { path: '', message: 'this is an warning', severity: 'WARNING' }
    ];
    renderEditor({ headerState: headerState });
    expect(screen.getByTitle(/this is an error/i)).toHaveAttribute('data-state', 'error');
    expect(screen.getByTitle(/this is an warning/i)).toHaveAttribute('data-state', 'warning');
  });

  test('editor do not show messages with path', () => {
    const headerState: InscriptionValidation[] = [{ path: 'output', message: 'message on output', severity: 'ERROR' }];
    renderEditor({ headerState: headerState });
    expect(screen.queryByTitle(/message on output/i)).not.toBeInTheDocument();
  });

  describe('Editor with errors', () => {
    const original = console.error;

    beforeEach(() => {
      console.error = vi.fn();
    });

    afterEach(() => {
      console.error = original;
    });

    test('editor part render error', async () => {
      renderEditor();
      await userEvent.click(screen.getByRole('button', { name: 'Result' }));
      expect(screen.getByRole('alert')).toHaveTextContent('this is an exception');
      expect(console.error).toHaveBeenCalled();
    });
  });
});
