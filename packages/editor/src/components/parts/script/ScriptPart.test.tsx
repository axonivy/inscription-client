import type { DeepPartial } from 'test-utils';
import { render, screen, renderHook, CollapsableUtil } from 'test-utils';
import { useScriptPart } from './ScriptPart';
import type { PartStateFlag } from '../../editors';
import type { ScriptData, ElementData, InscriptionValidation } from '@axonivy/inscription-protocol';
import { describe, test, expect } from 'vitest';

const Part = () => {
  const part = useScriptPart();
  return <>{part.content}</>;
};

describe('ScriptPart', () => {
  function renderPart(data?: ScriptData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(code: string) {
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Code');
  });

  test('full data', async () => {
    renderPart({ code: 'code' });
    await assertMainPart('code');
  });

  function assertState(expectedState: PartStateFlag, data?: Partial<ScriptData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useScriptPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState(undefined);
    assertState('configured', { code: 'code' });

    assertState('error', undefined, { path: 'code', message: '', severity: 'ERROR' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: { code: 'code' }
    };
    const view = renderHook(() => useScriptPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { code: 'init' } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.code).toEqual('init');
  });
});
