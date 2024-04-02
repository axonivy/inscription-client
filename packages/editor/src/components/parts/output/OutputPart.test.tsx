import type { DeepPartial } from 'test-utils';
import { render, screen, TableUtil, renderHook, waitFor, CollapsableUtil } from 'test-utils';
import { useOutputPart } from './OutputPart';
import type { PartStateFlag } from '../../editors';
import type { ElementData, OutputData } from '@axonivy/inscription-protocol';
import { describe, test, expect } from 'vitest';

const Part = (props: { hideCode?: boolean }) => {
  const part = useOutputPart({ hideCode: props.hideCode });
  return <>{part.content}</>;
};

describe('OutputPart', () => {
  function renderPart(data?: Partial<OutputData>, hideCode?: boolean) {
    render(<Part hideCode={hideCode} />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(map: RegExp[], code: string) {
    TableUtil.assertRows(map);
    expect(await screen.findByTestId('code-editor')).toHaveValue(code);
  }

  test('empty data', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Mapping');
    await CollapsableUtil.assertClosed('Code');
  });

  test('full data', async () => {
    const data: Partial<OutputData> = { output: { map: { key: 'value' }, code: 'code' } };
    renderPart(data);
    await assertMainPart([/key value/], 'code');
  });

  test('hide code', async () => {
    renderPart({}, true);
    await waitFor(() => expect(screen.queryByTestId('code-editor')).not.toBeInTheDocument());
  });

  function assertState(expectedState: PartStateFlag, data?: Partial<OutputData>, hideCode?: boolean) {
    const { result } = renderHook(() => useOutputPart({ hideCode }), { wrapperProps: { data: data && { config: data } } });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState(undefined);
    assertState(undefined, { sudo: true });
    assertState(undefined, { output: { code: 'code', map: {} } }, true);
    assertState('configured', { output: { code: 'code', map: {} } });
    assertState('configured', { output: { code: '', map: { key: 'value' } } });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: { output: { map: { key: 'value' }, code: 'code' } }
    };
    const view = renderHook(() => useOutputPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { output: { code: 'init' } } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.output?.code).toEqual('init');
    expect(data.config?.output?.map).toEqual({});
  });

  test('reset - hide code', () => {
    let data: DeepPartial<ElementData> = {
      config: { output: { map: { key: 'value' }, code: 'code' } }
    };
    const view = renderHook(() => useOutputPart({ hideCode: true }), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { output: { code: 'init' } } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.output?.code).toEqual('code');
    expect(data.config?.output?.map).toEqual({});
  });
});
