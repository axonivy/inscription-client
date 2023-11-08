import TaskListPart from './TaskListOptions';
import { WfTask } from '@axonivy/inscription-protocol';
import { render, screen, userEvent } from 'test-utils';

describe('TaskListOption', () => {
  function renderTaskPart(data?: Partial<WfTask>) {
    render(<TaskListPart />, { wrapperProps: { data: data && { config: { task: data } } } });
  }

  test('empty', async () => {
    renderTaskPart();
    await userEvent.click(screen.getByRole('button', { name: /Option/ }));

    expect(screen.getByLabelText('Skip Tasklist')).not.toBeChecked();
    expect(screen.getByLabelText('Suppress Notification')).not.toBeChecked();
    expect(screen.getByLabelText('Delay')).toHaveValue('');
  });

  test('configured', async () => {
    renderTaskPart({ skipTasklist: true, delay: 'delay', notification: {suppress: true} });
    expect(screen.getByLabelText('Skip Tasklist')).toBeChecked();
    expect(screen.getByLabelText('Suppress Notification')).toBeChecked();
    expect(screen.getByLabelText('Delay')).toHaveValue('delay');
  });
});
