import type { DeepPartial } from 'test-utils';
import { render, renderHook, screen, TableUtil, CollapsableUtil, ComboboxUtil } from 'test-utils';
import type { ElementData, InscriptionValidation, RestResponseData } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../editors';
import { useRestResponsePart } from './RestResponsePart';
import { describe, test, expect } from 'vitest';

const Part = () => {
  const part = useRestResponsePart();
  return <>{part.content}</>;
};

describe('RestResponsePart', () => {
  function renderPart(data?: DeepPartial<RestResponseData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Result Type');
    await CollapsableUtil.assertClosed('Mapping');
    await CollapsableUtil.assertClosed('Code');
    await CollapsableUtil.assertClosed('Error');
  });

  test('data', async () => {
    renderPart({ response: { entity: { map: { bla: '123' }, code: 'code' }, clientError: 'client', statusError: 'status' } });
    TableUtil.assertRows(['⛔ bla 123']);
    expect(screen.getByTestId('code-editor')).toHaveValue('code');
    await CollapsableUtil.assertOpen('Error');
    await ComboboxUtil.assertValue('client', { label: 'On Error (Connection, Timeout, etc.)' });
    await ComboboxUtil.assertValue('status', { label: 'On Status Code not successful (2xx)' });
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<RestResponseData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useRestResponsePart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState(undefined);
    assertState('configured', { response: { clientError: 'asdf' } });
    assertState('configured', { response: { entity: { code: 'a' } } });

    assertState('error', undefined, { path: 'response.statusError', message: '', severity: 'ERROR' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = { config: { response: { entity: { code: '123' }, clientError: 'code' } } };
    const view = renderHook(() => useRestResponsePart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { response: { clientError: 'init' } } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.response?.clientError).toEqual('init');
    expect(data.config?.response?.entity?.code).toEqual('');
  });
});
