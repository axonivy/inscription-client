import { render, screen, renderHook } from 'test-utils';
import { useCodeTab } from './CodeTab';
import { TabState } from '../../../components/props';
import { OutputData } from '@axonivy/inscription-protocol';

const Tab = () => {
  const tab = useCodeTab();
  return <>{tab.content}</>;
};

describe('CodeTab', () => {
  function renderTab(data?: OutputData) {
    render(<Tab />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(code: string, sudo: boolean) {
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
    const sudoCheckbox = await screen.findByLabelText(/Disable Permission/);
    if (sudo) {
      expect(sudoCheckbox).toBeChecked();
    } else {
      expect(sudoCheckbox).not.toBeChecked();
    }
  }

  test('empty data', async () => {
    renderTab();
    await assertMainPart('', false);
  });

  test('full data', async () => {
    const data: OutputData = { output: { code: 'code', map: {} }, sudo: true };
    renderTab(data);
    await assertMainPart('code', true);
  });

  function assertState(expectedState: TabState, data?: Partial<OutputData>) {
    const { result } = renderHook(() => useCodeTab(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { sudo: true });
    assertState('configured', { output: { code: 'code', map: {} } });
    assertState('empty', { output: { code: '', map: { key: 'value' } } });
  });
});
