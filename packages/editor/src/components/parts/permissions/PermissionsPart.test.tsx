import { DeepPartial, render, renderHook, screen } from 'test-utils';
import { ElementData, InscriptionValidation, PermissionsData } from '@axonivy/inscription-protocol';
import { PartStateFlag } from '../../editors';
import { usePermissionsPart } from './PermissionsPart';

const Part = () => {
  const part = usePermissionsPart();
  return <>{part.content}</>;
};

describe('PermissionsPart', () => {
  function renderPart(data?: PermissionsData) {
    render(<Part />, {
      wrapperProps: { data: data && { config: data } }
    });
  }

  test('empty data', async () => {
    renderPart();
    expect(screen.getByLabelText('Allow all workflow users to view the process on the Engine')).toBeChecked();
  });

  test('full data', async () => {
    renderPart({
      permissions: {
        view: { allowed: false }
      }
    });
    expect(screen.getByLabelText('Allow all workflow users to view the process on the Engine')).not.toBeChecked();
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<PermissionsData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => usePermissionsPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', {
      permissions: {
        view: { allowed: false }
      }
    });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: {
        permissions: {
          view: { allowed: false }
        }
      }
    };
    const view = renderHook(() => usePermissionsPart(), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.permissions?.view?.allowed).toBeTruthy;
  });
});
