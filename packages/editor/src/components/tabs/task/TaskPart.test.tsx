import TaskPart from './TaskPart';
import { Data, DEFAULT_TASK } from '@axonivy/inscription-protocol';
import { render, screen, userEvent } from 'test-utils';

describe('TaskPart', () => {
  function renderTaskPart(showPersist?: boolean) {
    // @ts-ignore
    const data: Data = { config: { task: DEFAULT_TASK } };
    render(<TaskPart showPersist={showPersist} />, { wrapperProps: { data } });
  }

  test('task part render responsible and skip task list option', async () => {
    renderTaskPart();
    const optionCollapse = screen.getByRole('button', { name: /Option/ });
    await userEvent.click(optionCollapse);

    expect(screen.getByText('Responsible')).toBeInTheDocument();
    expect(screen.getByText('Skip Tasklist')).toBeInTheDocument();
    expect(screen.getByText('Delay')).toBeInTheDocument();
    expect(screen.queryByText(/Persist/)).not.toBeInTheDocument();
  });

  test('task part render persist option', async () => {
    renderTaskPart(true);
    const optionCollapse = screen.getByRole('button', { name: /Option/ });
    await userEvent.click(optionCollapse);

    expect(screen.getByText(/Persist/)).toBeInTheDocument();
    expect(screen.queryByText('Responsible')).not.toBeInTheDocument();
    expect(screen.queryByText('Skip Tasklist')).not.toBeInTheDocument();
    expect(screen.queryByText('Delay')).not.toBeInTheDocument();
  });
});
