import { Tab } from './Tab';
import { PartProps } from '../../props';
import { render, screen, userEvent } from 'test-utils';

describe('Tabs', () => {
  const tabs: PartProps[] = [
    { name: 'Name', state: 'empty', content: <h1>Name</h1> },
    { name: 'Call', state: 'warning', content: <h1>Call</h1> },
    { name: 'Result', state: 'error', content: <h1>Result</h1> }
  ];

  function renderTabs() {
    render(<Tab tabs={tabs} />);
  }

  test('tabs will render', () => {
    renderTabs();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');
  });

  test('tabs show state', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: /Name/ })).toHaveAccessibleName('empty Name');
    expect(screen.getByRole('tab', { name: /Call/ })).toHaveAccessibleName('warning Call');
    expect(screen.getByRole('tab', { name: /Result/ })).toHaveAccessibleName('error Result');
  });

  test('tabs switch tab', async () => {
    renderTabs();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');

    const call = screen.getByRole('tab', { name: /Call/ });
    await userEvent.click(call);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Call');

    const result = screen.getByRole('tab', { name: /Result/ });
    await userEvent.click(result);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Result');

    const name = screen.getByRole('tab', { name: /Name/ });
    await userEvent.click(name);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');
  });

  test('tabs switch tab by keyboard', async () => {
    renderTabs();

    const name = screen.getByRole('tab', { name: /Name/ });
    const call = screen.getByRole('tab', { name: /Call/ });
    const result = screen.getByRole('tab', { name: /Result/ });

    await userEvent.tab();
    expect(name).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');

    await userEvent.keyboard('[ArrowRight]');
    expect(call).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Call');

    await userEvent.keyboard('[ArrowRight]');
    expect(result).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Result');

    await userEvent.keyboard('[ArrowLeft]');
    expect(call).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Call');
  });
});
