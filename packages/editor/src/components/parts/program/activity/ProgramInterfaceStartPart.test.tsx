import type { DeepPartial } from 'test-utils';
import { CollapsableUtil, ComboboxUtil, render, renderHook } from 'test-utils';
import type { ElementData, ValidationResult, ProgramInterfaceStartData } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../../editors';
import { useProgramInterfaceStartPart } from './ProgramInterfaceStartPart';
import { describe, test, expect } from 'vitest';

const Part = () => {
  const part = useProgramInterfaceStartPart();
  return <>{part.content}</>;
};

describe('ProgramInterfaceStartPart', () => {
  function renderPart(data?: DeepPartial<ProgramInterfaceStartData>) {
    render(<Part />, {
      wrapperProps: { data: data && { config: data } }
    });
  }

  test('empty data', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Java Class');
  });

  test('full data', async () => {
    renderPart({
      javaClass: 'Test'
    });
    await ComboboxUtil.assertValue('Test', { nth: 0 });
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<ProgramInterfaceStartData>, validation?: ValidationResult) {
    const { result } = renderHook(() => useProgramInterfaceStartPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState(undefined);
    assertState('configured', { javaClass: 'Bla' });

    assertState('error', undefined, { path: 'javaClass.cause', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'javaClass.cause', message: '', severity: 'WARNING' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: { javaClass: 'Test' }
    };
    const view = renderHook(() => useProgramInterfaceStartPart(), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.javaClass).toEqual('');
  });
});
