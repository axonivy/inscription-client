import { DeepPartial, render, renderHook, screen } from 'test-utils';
import { ElementData, InscriptionValidation, ProgramStartData } from '@axonivy/inscription-protocol';
import { PartStateFlag } from '../../editors';
import { useProgramStartPart } from './StartPart';

const Part = () => {
  const part = useProgramStartPart();
  return <>{part.content}</>;
};

describe('StartPart', () => {
  function renderPart(data?: ProgramStartData) {
    render(<Part />, {
      wrapperProps: { data: data && { config: data } }
    });
  }

  test('empty data', async () => {
    renderPart();
    expect(screen.queryByText('Permission')).toBeInTheDocument();
  });

  test('full data', async () => {
    renderPart({
      javaClass: 'Test',
      permission: {
        anonymous: false,
        error: '>> Ignore Exception',
        role: 'SYSTEM'
      }
    });
    expect(screen.getByLabelText('Java Class')).toHaveValue('Test');
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<ProgramStartData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useProgramStartPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', {
      javaClass: 'Bla'
    });

    assertState('error', undefined, { path: 'javaClass.cause', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'javaClass.error', message: '', severity: 'WARNING' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: {
        javaClass: 'Test'
      }
    };
    const view = renderHook(() => useProgramStartPart(), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.javaClass).toEqual('');
  });
});
