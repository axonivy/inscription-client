import type { DeepPartial} from 'test-utils';
import { render, renderHook, screen } from 'test-utils';
import type { WebServiceProcessData, ElementData, InscriptionValidation } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../editors';
import { useWebServiceProcessPart } from './WebServiceProcessPart';

const Part = () => {
  const part = useWebServiceProcessPart();
  return <>{part.content}</>;
};

describe('WebServiceProcessPart', () => {
  function renderPart(data?: WebServiceProcessData) {
    render(<Part />, {
      wrapperProps: { data: data && { config: data } }
    });
  }

  test('empty data', async () => {
    renderPart();
    expect(screen.getByLabelText('Qualified name')).toHaveValue('');
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByRole('radio', { name: 'None/Container' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'WS Security' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'HTTP Basic' })).not.toBeChecked();
  });

  test('full data', async () => {
    renderPart({
      wsAuth: 'HTTP_BASIC',
      wsTypeName: 'Test'
    });
    expect(screen.getByLabelText('Qualified name')).toHaveValue('Test');
    expect(screen.getByRole('radio', { name: 'WS Security' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'HTTP Basic' })).toBeChecked();
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<WebServiceProcessData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useWebServiceProcessPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', {
      wsAuth: 'HTTP_BASIC',
      wsTypeName: 'Test'
    });

    assertState('error', undefined, { path: 'wsAuth.cause', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'wsTypeName.error', message: '', severity: 'WARNING' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: {
        wsAuth: 'HTTP_BASIC',
        wsTypeName: 'Test'
      }
    };
    const view = renderHook(() => useWebServiceProcessPart(), {
      wrapperProps: { data, setData: newData => (data = newData) }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.wsAuth).toEqual('NONE');
    expect(data.config?.wsTypeName).toEqual('');
  });
});
