import PersistOptions from './PersistOptions';
import { TaskData } from '@axonivy/inscription-protocol';
import { render, screen, userEvent } from 'test-utils';

describe('PersistOptions', () => {
  function renderTaskPart(data?: Partial<TaskData>) {
    render(<PersistOptions />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty', async () => {
    renderTaskPart();
    const optionCollapse = screen.getByRole('button', { name: /Option/ });
    await userEvent.click(optionCollapse);
    expect(screen.getByLabelText(/Persist/)).not.toBeChecked();
  });

  test('configured', async () => {
    renderTaskPart({ persistOnStart: true });
    expect(screen.getByLabelText(/Persist/)).toBeChecked();
  });
});
