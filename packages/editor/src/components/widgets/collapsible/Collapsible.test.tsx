import { Message } from '../message/Message';
import Collapsible from './Collapsible';
import { render, screen, userEvent } from 'test-utils';

describe('Collapsible', () => {
  const COLLAPSE_DATA = /collapsible data/i;

  function renderCollapsible(open: boolean, options?: { message: Message }) {
    render(
      <Collapsible label='Test' defaultOpen={open} message={options?.message}>
        <p>collapsible data</p>
      </Collapsible>
    );
  }

  function collapseBtn(): HTMLElement {
    return screen.getByRole('button', { name: /Test/i });
  }

  test('collapse part will render after click on trigger', async () => {
    renderCollapsible(false);
    expect(screen.queryByText(COLLAPSE_DATA)).not.toBeInTheDocument();
    await userEvent.click(collapseBtn());
    expect(screen.getByText(COLLAPSE_DATA)).toBeInTheDocument();
  });

  test('collapse part will hide after click on trigger', async () => {
    renderCollapsible(true);
    expect(screen.getByText(COLLAPSE_DATA)).toBeInTheDocument();
    await userEvent.click(collapseBtn());
    expect(screen.queryByText(COLLAPSE_DATA)).not.toBeInTheDocument();
  });

  test('collapse part will toggle with keyboard', async () => {
    renderCollapsible(false);
    expect(screen.queryByText(COLLAPSE_DATA)).not.toBeInTheDocument();
    await userEvent.tab();
    expect(collapseBtn()).toHaveFocus();
    await userEvent.keyboard('[Enter]');
    expect(screen.getByText(COLLAPSE_DATA)).toBeInTheDocument();
    await userEvent.keyboard('[Space]');
    expect(screen.queryByText(COLLAPSE_DATA)).not.toBeInTheDocument();
  });

  test('message', () => {
    renderCollapsible(false, { message: { message: 'this is a error', severity: 'ERROR' } });
    expect(screen.getByTitle('this is a error')).toHaveClass('message');
  });

  test('no message if open', () => {
    renderCollapsible(true, { message: { message: 'this is a error', severity: 'ERROR' } });
    expect(screen.queryByTitle('this is a error')).not.toBeInTheDocument();
  });
});
