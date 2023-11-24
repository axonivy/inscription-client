import type { DeepPartial} from 'test-utils';
import { render, renderHook, screen } from 'test-utils';
import type { ElementData, InscriptionValidation, RestRequestData } from '@axonivy/inscription-protocol';
import type { PartStateFlag } from '../../editors/index.js';
import { useRestRequestPart } from './RestRequestPart.js';

const Part = () => {
  const part = useRestRequestPart();
  return <>{part.content}</>;
};

describe('RestRequestPart', () => {
  function renderPart(data?: DeepPartial<RestRequestData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty', async () => {
    renderPart();
    expect(screen.getByLabelText('Client')).toBeInTheDocument();
    expect(screen.getByLabelText('Resource')).toBeInTheDocument();
    expect(screen.getByText('Parameters')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Properties')).toBeInTheDocument();
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
    expect(screen.queryByText('JAX-RS')).not.toBeInTheDocument();
  });

  test('post', async () => {
    renderPart({ method: 'POST' });
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.queryByText('JAX-RS')).not.toBeInTheDocument();
  });

  test('jax-rs', async () => {
    renderPart({ method: 'JAX_RS' });
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
    expect(screen.getByText('JAX-RS')).toBeInTheDocument();
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<RestRequestData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useRestRequestPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { code: 'code' });
    assertState('configured', { method: 'DELETE' });
    assertState('configured', { body: { mediaType: 'app/json' } });
    assertState('configured', { target: { clientId: 'client' } });

    assertState('error', undefined, { path: 'code', message: '', severity: 'ERROR' });
    assertState('error', undefined, { path: 'method', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'body.mediaType', message: '', severity: 'WARNING' });
    assertState('warning', undefined, { path: 'target.clientId', message: '', severity: 'WARNING' });
  });

  test('reset', () => {
    let data: DeepPartial<ElementData> = {
      config: { code: 'code', method: 'DELETE', target: { clientId: '123', headers: { myHeader: 'a' } }, body: { mediaType: 'type' } }
    };
    const view = renderHook(() => useRestRequestPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { method: 'PUT' } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config?.code).toEqual('');
    expect(data.config?.method).toEqual('PUT');
    expect(data.config?.body?.mediaType).toEqual('application/json');
    expect(data.config?.target?.clientId).toEqual('');
    expect(data.config?.target?.headers).toEqual({ Accept: '*/*' });
  });
});
