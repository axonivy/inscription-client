import { PartProps, PartState } from '../../props';
import { render, screen, userEvent } from 'test-utils';
import { Accordion } from './Accordion';

describe('Accoridon', () => {
  function partProps(reset?: { dirty: boolean; action: () => void }): PartProps[] {
    return [
      { name: 'Name', state: 'empty', content: <h1>Name</h1> },
      { name: 'Call', state: 'warning', content: <h1>Call</h1>, reset },
      { name: 'Result', state: 'error', content: <h1>Result</h1> }
    ];
  }

  function renderAccordions(): {
    rerender: () => void;
  } {
    let parts: PartProps[];
    const action = () => (parts = partProps());
    parts = partProps({ dirty: true, action });
    const view = render(<Accordion parts={parts} />);
    return {
      rerender: () => view.rerender(<Accordion parts={parts} />)
    };
  }

  test('accordion will render', () => {
    renderAccordions();
    assertExpanded('Name', false);
    assertExpanded('Call', false);
    assertExpanded('Result', false);
  });

  test('accordion show state', () => {
    renderAccordions();
    assertPartState('Name', 'empty');
    assertPartState('Call', 'warning');
    assertPartState('Result', 'error');
  });

  test('accordion reset data', async () => {
    const view = renderAccordions();
    assertDirtyState('Call', true);

    await userEvent.click(screen.getByRole('button', { name: 'Reset Call' }));
    view.rerender();
    assertDirtyState('Call', false);
  });

  test('accordion open section', async () => {
    renderAccordions();
    const nameBtn = screen.getByRole('button', { name: 'Name' });
    const callBtn = screen.getByRole('button', { name: 'Call' });
    assertExpanded('Name', false);
    await userEvent.click(nameBtn);
    assertExpanded('Name', true);

    assertExpanded('Call', false);
    await userEvent.click(callBtn);
    assertExpanded('Call', true);

    assertExpanded('Name', true);
    await userEvent.click(nameBtn);
    assertExpanded('Name', false);
  });

  test('accordion open section by keyboard', async () => {
    renderAccordions();

    const nameBtn = screen.getByRole('button', { name: 'Name' });
    const callBtn = screen.getByRole('button', { name: 'Call' });
    const callResetBtn = screen.getByRole('button', { name: 'Reset Call' });

    await userEvent.tab();
    expect(nameBtn).toHaveFocus();
    assertExpanded('Name', false);

    await userEvent.keyboard('[Enter]');
    assertExpanded('Name', true);

    await userEvent.keyboard('[ArrowDown]');
    expect(callBtn).toHaveFocus();

    await userEvent.tab();
    expect(callResetBtn).toHaveFocus();

    await userEvent.tab({ shift: true });
    await userEvent.keyboard('[ArrowUp]');
    await userEvent.keyboard('[Space]');
    assertExpanded('Name', false);
  });

  function assertExpanded(accordionName: string, expanded: boolean) {
    expect(screen.getByRole('button', { name: accordionName })).toHaveAttribute('aria-expanded', `${expanded}`);
  }

  function assertPartState(accordionName: string, state: PartState) {
    expect(screen.getByRole('button', { name: accordionName }).children[0]).toHaveAttribute('data-state', state);
  }

  function assertDirtyState(accordionName: string, dirty: boolean) {
    expect(screen.getByRole('button', { name: accordionName }).children[0]).toHaveAttribute('data-dirty', `${dirty}`);
  }
});
