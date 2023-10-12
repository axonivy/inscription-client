import { HTTP_METHOD, RestRequestData, RestResourceMeta } from '@axonivy/inscription-protocol';
import { RestMethodSelect } from './RestMethodSelect';
import { ComboboxUtil, DeepPartial, SelectUtil, render, screen } from 'test-utils';

describe('RestMethodSelect', () => {
  function renderMethodSelect(data?: DeepPartial<RestRequestData>) {
    const restResources: RestResourceMeta[] = [
      { method: 'GET', path: '/pet', description: 'Get a random pet' },
      { method: 'DELETE', path: '/pet/{petId}', description: 'Delete a pet with given id' }
    ];
    render(<RestMethodSelect />, {
      wrapperProps: { data: data && { config: data }, meta: { restResources } }
    });
  }

  test('empty', async () => {
    renderMethodSelect();
    expect(screen.getByLabelText('Resource')).toHaveValue('');
    await SelectUtil.assertValue('GET');
    await SelectUtil.assertOptionsCount(Object.keys(HTTP_METHOD).length);
  });

  test('empty - openapi', async () => {
    renderMethodSelect({ target: { clientId: 'client' } });
    await ComboboxUtil.assertValue('GET:');
  });

  test('data', async () => {
    renderMethodSelect({ target: { path: '/my/rest/api' }, method: 'DELETE' });
    expect(screen.getByLabelText('Resource')).toHaveValue('/my/rest/api');
    await SelectUtil.assertValue('DELETE');
  });

  test('data - openapi', async () => {
    renderMethodSelect({ target: { clientId: 'client', path: '/pet/{petId}' }, method: 'DELETE' });
    await ComboboxUtil.assertValue('DELETE:/pet/{petId}');
  });
});
