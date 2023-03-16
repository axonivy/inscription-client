import { render, renderHook, screen } from 'test-utils';
import { EndPageData } from '@axonivy/inscription-protocol';
import { useEndPageTab } from './EndPageTab';
import { TabState } from '../../props';

const Tab = () => {
  const tab = useEndPageTab();
  return <>{tab.content}</>;
};

describe('EndPageTab', () => {
  function renderTab(data?: EndPageData) {
    render(<Tab />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertPage(page: string) {
    expect(await screen.findByLabelText('Display the following page')).toHaveValue(page);
  }

  test('empty data', async () => {
    renderTab();
    await assertPage('');
  });

  test('full data', async () => {
    renderTab({ page: 'layout/basic.xhtml' });
    await assertPage('layout/basic.xhtml');
  });

  function assertState(expectedState: TabState, data?: EndPageData) {
    const { result } = renderHook(() => useEndPageTab(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { page: 'bla' });
  });
});
