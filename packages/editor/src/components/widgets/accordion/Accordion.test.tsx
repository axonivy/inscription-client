import { TabProps, TabState } from '../../props';
import { render, screen, userEvent } from 'test-utils';
import { Accordion } from './Accordion';

describe('Accoridon', () => {
  function tabProps(reset?: { dirty: boolean; action: () => void }): TabProps[] {
    return [
      { name: 'Name', state: 'empty', content: <h1>Name</h1> },
      { name: 'Call', state: 'warning', content: <h1>Call</h1>, reset },
      { name: 'Result', state: 'error', content: <h1>Result</h1> }
    ];
  }

  function renderAccordions(): {
    rerender: () => void;
  } {
    let tabs: TabProps[];
    const action = () => (tabs = tabProps());
    tabs = tabProps({ dirty: true, action });
    const view = render(<Accordion tabs={tabs} />);
    return {
      rerender: () => view.rerender(<Accordion tabs={tabs} />)
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
    assertTabState('Name', 'empty');
    assertTabState('Call', 'warning');
    assertTabState('Result', 'error');
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

  function assertTabState(accordionName: string, state: TabState) {
    expect(screen.getByRole('button', { name: accordionName }).children[0]).toHaveAttribute('data-state', state);
  }

  function assertDirtyState(accordionName: string, dirty: boolean) {
    expect(screen.getByRole('button', { name: accordionName }).children[0]).toHaveAttribute('data-dirty', `${dirty}`);
  }
});
