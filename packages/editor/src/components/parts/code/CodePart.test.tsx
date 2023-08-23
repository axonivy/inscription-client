import { render, screen, renderHook } from 'test-utils';
import { useCodePart } from './CodePart';
import { PartStateFlag } from '../../editors';
import { CodeData, InscriptionValidation } from '@axonivy/inscription-protocol';

const Part = () => {
  const part = useCodePart();
  return <>{part.content}</>;
};

describe('CodePart', () => {
  function renderPart(data?: CodeData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(code: string, sudo: boolean) {
    expect(await screen.findByLabelText('Code')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderPart();
    await assertMainPart('', false);
  });

  test('full data', async () => {
    renderPart({ code: 'code' });
    await assertMainPart('code', true);
  });

  function assertState(expectedState: PartStateFlag, data?: Partial<CodeData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useCodePart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { code: 'code' });

    assertState('error', undefined, { path: 'code', message: '', severity: 'ERROR' });
  });

  test('reset', () => {
    let data: any = {
      config: { code: 'code' }
    };
    const view = renderHook(() => useCodePart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { code: 'init' } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config.code).toEqual('init');
  });
});
