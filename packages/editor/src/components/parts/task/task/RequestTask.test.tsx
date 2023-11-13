import type { WfTask } from '@axonivy/inscription-protocol';
import { render, screen, userEvent } from 'test-utils';
import RequestTask from './RequestTask';

describe('RequestTask', () => {
  function renderTask(data?: Partial<WfTask>) {
    render(<RequestTask />, { wrapperProps: { data: data && { config: { task: data } } } });
  }

  test('persist option', async () => {
    renderTask();
    expect(screen.queryByText('Responsible')).not.toBeInTheDocument();

    const optionCollapse = screen.getByRole('button', { name: /Option/ });
    await userEvent.click(optionCollapse);

    expect(screen.getByText(/Persist/)).toBeInTheDocument();
    expect(screen.queryByText('Skip Tasklist')).not.toBeInTheDocument();
    expect(screen.queryByText('Delay')).not.toBeInTheDocument();
  });
});
