import PersistPart from './PersistPart';
import { TaskData } from '@axonivy/inscription-protocol';
import { render, screen, userEvent } from 'test-utils';

describe('TaskPart', () => {
  function renderTaskPart(data?: Partial<TaskData>) {
    render(<PersistPart />, { wrapperProps: { data: data && { config: data } } });
  }

  test('task option render empty', async () => {
    renderTaskPart();
    const optionCollapse = screen.getByRole('button', { name: /Option/ });
    await userEvent.click(optionCollapse);
    expect(screen.getByLabelText(/Persist/)).not.toBeChecked();
  });

  test('task option render full', async () => {
    renderTaskPart({ persistOnStart: true });
    expect(screen.getByLabelText(/Persist/)).toBeChecked();
  });
});
