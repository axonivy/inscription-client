import { ComboboxUtil, render, renderHook } from 'test-utils';
import { ErrorCatchData } from '@axonivy/inscription-protocol';
import { useErrorCatchPart } from './ErrorCatchPart';
import { PartState } from '../../props';

const Part = () => {
  const part = useErrorCatchPart();
  return <>{part.content}</>;
};

describe('ErrorCatchPart', () => {
  function renderPart(data?: ErrorCatchData) {
    render(<Part />, {
      wrapperProps: { data: data && { config: data }, meta: { eventCodes: [{ eventCode: 'test', process: '', project: '', usage: 1 }] } }
    });
  }

  async function assertMainPart(errorCode: string) {
    await ComboboxUtil.assertValue(errorCode, { label: 'Error Code' });
    await ComboboxUtil.assertOptionsCount(2);
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart('');
  });

  test('full data', async () => {
    renderPart({ errorCode: 'test:code' });
    await assertMainPart('test:code');
  });

  function assertState(expectedState: PartState, data?: Partial<ErrorCatchData>) {
    const { result } = renderHook(() => useErrorCatchPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { errorCode: 'error' });
  });

  test('reset', () => {
    let data: any = {
      config: { errorCode: 'error' }
    };
    const view = renderHook(() => useErrorCatchPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { errorCode: 'init' } } }
    });
    expect(view.result.current.reset?.dirty).toEqual(true);

    view.result.current.reset?.action();
    expect(data.config.errorCode).toEqual('init');
  });
});
