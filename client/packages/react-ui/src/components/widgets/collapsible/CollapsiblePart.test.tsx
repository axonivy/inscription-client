import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CollapsiblePart from './CollapsiblePart';

describe('CollapsiblePart', () => {
  const COLLAPSE_DATA = /collapsible data/i;

  function renderCollapsible(open: boolean) {
    render(
      <CollapsiblePart collapsibleLabel='Test' defaultOpen={open}>
        <p>collapsible data</p>
      </CollapsiblePart>
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
});
