import { Tab } from './Tab';
import { TabProps } from '../../props';
import { render, screen, userEvent } from 'test-utils';

describe('Tabs', () => {
  const tabs: TabProps[] = [
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

    const callTab = screen.getByRole('tab', { name: /Call/ });
    await userEvent.click(callTab);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Call');

    const resultTab = screen.getByRole('tab', { name: /Result/ });
    await userEvent.click(resultTab);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Result');

    const nameTab = screen.getByRole('tab', { name: /Name/ });
    await userEvent.click(nameTab);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');
  });

  test('tabs switch tab by keyboard', async () => {
    renderTabs();

    const nameTab = screen.getByRole('tab', { name: /Name/ });
    const callTab = screen.getByRole('tab', { name: /Call/ });
    const resultTab = screen.getByRole('tab', { name: /Result/ });

    await userEvent.tab();
    expect(nameTab).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Name');

    await userEvent.keyboard('[ArrowRight]');
    expect(callTab).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Call');

    await userEvent.keyboard('[ArrowRight]');
    expect(resultTab).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Result');

    await userEvent.keyboard('[ArrowLeft]');
    expect(callTab).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Call');
  });
});
