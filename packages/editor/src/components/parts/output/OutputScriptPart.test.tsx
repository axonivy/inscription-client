import type { DeepPartial } from 'test-utils';
import { render, screen, renderHook, CollapsableUtil } from 'test-utils';
import { useOutputScriptPart } from './OutputScriptPart';
import type { PartStateFlag } from '../../editors';
import type { ElementData, OutputData } from '@axonivy/inscription-protocol';
import { describe, test, expect } from 'vitest';

const Part = () => {
  const part = useOutputScriptPart();
  return <>{part.content}</>;
};

describe('OutputScriptPart', () => {
  function renderPart(data?: OutputData) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
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
    renderPart();
    await CollapsableUtil.assertClosed('Code');
  });

  test('full data', async () => {
    const data: OutputData = { output: { code: 'code', map: {} }, sudo: true };
    renderPart(data);
    await assertMainPart('code', true);
  });

  function assertState(expectedState: PartStateFlag, data?: Partial<OutputData>) {
    const { result } = renderHook(() => useOutputScriptPart(), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState(undefined);
    assertState('configured', { sudo: true });
    assertState('configured', { output: { code: 'code', map: {} } });
    assertState(undefined, { output: { code: '', map: { key: 'value' } } });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: { output: { code: 'code', map: {} }, sudo: true }
    };
    const view = renderHook(() => useOutputScriptPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { output: { code: 'init' } } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.output?.code).toEqual('init');
    expect(data.config?.output?.map).toEqual({});
    expect(data.config?.sudo).toEqual(false);
  });
});
