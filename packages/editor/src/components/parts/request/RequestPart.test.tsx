import { render, screen, renderHook, DeepPartial, TableUtil, SelectUtil, CollapsableUtil } from 'test-utils';
import { InscriptionValidation, RequestData } from '@axonivy/inscription-protocol';
import { useRequestPart } from './RequestPart';
import { PartStateFlag } from '../../editors';

const Part = () => {
  const part = useRequestPart();
  return <>{part.content}</>;
};

describe('RequestPart', () => {
  function renderPart(data?: DeepPartial<RequestData>) {
    render(<Part />, { wrapperProps: { data: data && { config: data } } });
  }

  async function assertMainPart(http: boolean, data?: DeepPartial<RequestData>) {
    const httpCheckbox = screen.getByLabelText('Yes, this can be started with a HTTP-Request / -Link');
    if (http) {
      expect(httpCheckbox).toBeChecked();
      expect(screen.getByLabelText('Start list')).not.toBeChecked();
      expect(screen.getByLabelText('Name')).toHaveValue(data?.request?.name);
      expect(screen.getByLabelText('Description')).toHaveValue(data?.request?.description);
      expect(screen.getByLabelText('Category')).toHaveValue(data?.request?.category);
      TableUtil.assertRows(['field value']);
      await CollapsableUtil.assertOpen('Permission');
      expect(screen.getByLabelText('Anonymous')).not.toBeChecked();
      SelectUtil.assertValue('Test', { label: 'Role' });
      SelectUtil.assertValue('>> Ignore Exception', { label: 'Validation error' });
    } else {
      expect(httpCheckbox).not.toBeChecked();
      expect(screen.queryByLabelText('Start list')).not.toBeInTheDocument();
    }
  }

  test('empty data', async () => {
    renderPart({ request: { isHttpRequestable: false } });
    await assertMainPart(false);
  });

  test('permissions default', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Permission');
    await CollapsableUtil.toggle('Permission');
    expect(screen.queryByLabelText('Role')).not.toBeInTheDocument();
  });

  test('full data', async () => {
    const data: DeepPartial<RequestData> = {
      request: {
        isHttpRequestable: true,
        isVisibleOnStartList: false,
        name: 'test',
        description: 'desc',
        category: 'cat',
        customFields: [{ name: 'field', value: 'value' }]
      },
      permission: {
        anonymous: false,
        error: '>> Ignore Exception',
        role: 'Test'
      }
    };
    renderPart(data);
    await assertMainPart(true, data);
  });

  function assertState(expectedState: PartStateFlag, data?: DeepPartial<RequestData>, validation?: InscriptionValidation) {
    const { result } = renderHook(() => useRequestPart(), {
      wrapperProps: { data: data && { config: data }, validations: validation && [validation] }
    });
    expect(result.current.state.state).toEqual(expectedState);
  }

  test('configured', async () => {
    assertState('empty');
    assertState('configured', { request: { isHttpRequestable: false } });
    assertState('configured', { request: { isHttpRequestable: true, name: 'a' } });
    assertState('configured', { request: { isHttpRequestable: true, description: 'a' } });
    assertState('configured', { request: { isHttpRequestable: true, category: 'a' } });
    assertState('configured', { request: { isHttpRequestable: true, isVisibleOnStartList: false } });
    assertState('configured', { request: { isHttpRequestable: true, customFields: [{ name: 'a', value: 'b' }] } });
    assertState('configured', { request: { isHttpRequestable: true }, permission: { anonymous: false } });
    assertState('configured', { request: { isHttpRequestable: true }, permission: { error: 'a' } });
    assertState('configured', { request: { isHttpRequestable: true }, permission: { role: 'a' } });

    assertState('error', undefined, { path: 'permission.role', message: '', severity: 'ERROR' });
    assertState('warning', undefined, { path: 'request.name', message: '', severity: 'WARNING' });
  });

  test('reset', () => {
    let data: any = { request: { isHttpRequestable: false, name: 'bla' } };
    const view = renderHook(() => useRequestPart(), {
      wrapperProps: { data, setData: newData => (data = newData), initData: { config: { request: { name: 'init' } } } }
    });
    expect(view.result.current.reset.dirty).toEqual(true);

    view.result.current.reset.action();
    expect(data.config.request.isHttpRequestable).toEqual(true);
    expect(data.config.request.name).toEqual('init');
  });
});
