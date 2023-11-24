import Task from './Task.js';
import type { WfTask } from '@axonivy/inscription-protocol';
import { CollapsableUtil, render, screen, SelectUtil, userEvent } from 'test-utils';

describe('Task', () => {
  function renderTask(data?: Partial<WfTask>) {
    render(<Task />, { wrapperProps: { data: data && { config: { task: data } } } });
  }

  async function assertMainPart(name: string, description: string, category: string, responsible: string, priority: string, code?: string) {
    expect(screen.getByLabelText('Name')).toHaveValue(name);
    expect(screen.getByLabelText('Description')).toHaveValue(description);
    expect(screen.getByLabelText('Category')).toHaveValue(category);
    await SelectUtil.assertValue(responsible, { label: 'Responsible' });
    await SelectUtil.assertValue(priority, { label: 'Priority' });

    if (code) {
      await CollapsableUtil.assertOpen('Code');
      expect(screen.getAllByTestId('code-editor').pop()).toHaveValue(code);
    } else {
      await CollapsableUtil.assertClosed('Code');
    }
  }

  test('task part render empty', async () => {
    renderTask();
    await assertMainPart('', '', '', 'Role', 'Normal');
    await SelectUtil.assertValue('Everybody', { index: 1 });
  });

  test('task part render skip task list option', async () => {
    renderTask(undefined);
    expect(SelectUtil.select({ label: 'Responsible' })).toBeInTheDocument();

    const optionCollapse = screen.getByRole('button', { name: /Option/ });
    await userEvent.default.click(optionCollapse);

    expect(screen.getByText('Skip Tasklist')).toBeInTheDocument();
    expect(screen.getByText('Delay')).toBeInTheDocument();
    expect(screen.queryByText(/Persist/)).not.toBeInTheDocument();
  });

  test('task part render all', async () => {
    renderTask({
      name: 'task',
      description: 'desc',
      category: 'cat',
      responsible: { type: 'ROLE_FROM_ATTRIBUTE', activator: 'bla' },
      priority: { level: 'EXCEPTION', script: '' },
      skipTasklist: true,
      notification: { suppress: true },
      delay: 'delay',
      customFields: [{ name: 'cf', type: 'NUMBER', value: '123' }],
      code: 'code'
    });
    await assertMainPart('task', 'desc', 'cat', 'Role from Attr.', 'Exception', 'code');
  });
});
