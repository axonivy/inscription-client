import { CollapsableUtil, DeepPartial, SelectUtil, render, renderHook, screen } from 'test-utils';
import { ElementData, InscriptionValidation, ProgramInterfaceStartData } from '@axonivy/inscription-protocol';
import { PartStateFlag } from '../../../editors';
import { useProgramInterfaceStartPart } from './ProgramInterfaceStartPart';

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
    await SelectUtil.assertEmpty();
    //await SelectUtil.assertOptionsCount(1);
    await CollapsableUtil.assertClosed('Program');
    await CollapsableUtil.assertClosed('Timeout');
  });

  test('full data', async () => {
    renderPart({
      javaClass: 'Test',
      exceptionHandler: '>> Ignore Exception',
      timeout: { seconds: '123', error: 'ivy:error:program:timeout' }
    });
    expect(screen.getByLabelText('Java Class')).toHaveValue('Test');
    await CollapsableUtil.assertOpen('Program');
    await SelectUtil.assertValue('>> Ignore Exception', { index: 1 });
    await CollapsableUtil.assertOpen('Timeout');
    expect(screen.getByLabelText('Seconds')).toHaveValue('123');
    await SelectUtil.assertValue('ivy:error:program:timeout', { index: 2 });
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<ProgramInterfaceStartData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useProgramInterfaceStartPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { javaClass: 'Bla' });
    assertState('configured', { exceptionHandler: '>> Ignore Exception' });
    assertState('configured', { timeout: { seconds: '123' } });

    assertState('error', undefined, { path: 'javaClass.cause', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'exceptionHandler.error', message: '', severity: 'WARNING' });
    assertState('error', undefined, { path: 'timeout.cause', message: '', severity: 'ERROR' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: { javaClass: 'Test', exceptionHandler: '>> Ignore Exception', timeout: { seconds: '123' } }
    };
    const view = renderHook(() => useProgramInterfaceStartPart(), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.javaClass).toEqual('');
    expect(data.config?.exceptionHandler).toEqual('');
    expect(data.config?.timeout?.seconds).toEqual('');
  });
});
