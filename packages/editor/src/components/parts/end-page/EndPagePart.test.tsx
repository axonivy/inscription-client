import { render, renderHook, screen } from 'test-utils';
import { EndPageData } from '@axonivy/inscription-protocol';
import { useEndPagePart } from './EndPagePart';
import { PartState } from '../../props';

const Part = () => {
  const part = useEndPagePart();
  return <>{part.content}</>;
};

describe('EndPagePart', () => {
  function renderPart(data?: EndPageData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertPage(page: string) {
    expect(await screen.findByLabelText('Display the following page')).toHaveValue(page);
  }

  test('empty data', async () => {
    renderPart();
    await assertPage('');
  });

  test('full data', async () => {
    renderPart({ page: 'layout/basic.xhtml' });
    await assertPage('layout/basic.xhtml');
  });

  function assertState(expectedState: PartState, data?: EndPageData) {
    const { result } = renderHook(() => useEndPagePart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { page: 'bla' });
  });
});
