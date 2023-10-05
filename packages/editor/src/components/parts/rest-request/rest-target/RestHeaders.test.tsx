import { RestRequestData, RestResource } from '@axonivy/inscription-protocol';
import { RestHeaders } from './RestHeaders';
import { CollapsableUtil, ComboboxUtil, DeepPartial, render, TableUtil } from 'test-utils';

describe('RestHeaders', () => {
  function renderHeaders(data?: DeepPartial<RestRequestData>) {
    const restHeaders = ['Type'];
    const restContentTypes = ['app/json', 'app/xml', 'other type'];
    const restResource: DeepPartial<RestResource> = { headers: [{ name: 'api_key' }] };
    render(<RestHeaders />, { wrapperProps: { data: data && { config: data }, meta: { restHeaders, restContentTypes, restResource } } });
  }

  test('empty', async () => {
    renderHeaders();
    await CollapsableUtil.assertClosed('Headers');
  });

  test('data', async () => {
    renderHeaders({ target: { headers: { Accept: 'unknown' } } });
    await CollapsableUtil.assertOpen('Headers');
  });

  test('known content types', async () => {
    renderHeaders({ target: { headers: { Accept: 'unknown' } } });
    await ComboboxUtil.assertValue('unknown');
    await ComboboxUtil.assertOptionsCount(3);
  });

  test('known headers', async () => {
    renderHeaders({ target: { headers: { myOwnHeader: 'unknown' } } });
    TableUtil.assertRows(['myOwnHeader unknown']);
    await ComboboxUtil.assertValue('myOwnHeader', { nth: 1 });
    await ComboboxUtil.assertOptionsCount(2, { nth: 1 });
  });
});
