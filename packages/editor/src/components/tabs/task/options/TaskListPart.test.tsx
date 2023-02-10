import TaskListPart from './TaskListPart';
import { Task } from '@axonivy/inscription-protocol';
import { render, screen, userEvent } from 'test-utils';

describe('TaskPart', () => {
  function renderTaskPart(data?: Partial<Task>) {
    // @ts-ignore
    render(<TaskListPart />, { wrapperProps: { data: data && { config: { task: data } } } });
  }

  test('task option render empty', async () => {
    renderTaskPart();
    await userEvent.click(screen.getByRole('button', { name: /Option/ }));

    expect(screen.getByLabelText('Skip Tasklist')).not.toBeChecked();
    expect(screen.getByLabelText('Delay')).toHaveValue('');
  });

  test('task option render full', async () => {
    renderTaskPart({ skipTasklist: true, delay: 'delay' });
    expect(screen.getByLabelText('Skip Tasklist')).toBeChecked();
    expect(screen.getByLabelText('Delay')).toHaveValue('delay');
  });
});
