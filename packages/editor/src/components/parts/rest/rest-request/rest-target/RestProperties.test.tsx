import { render, DeepPartial, CollapsableUtil, TableUtil, ComboboxUtil } from 'test-utils';
import { RestRequestData } from '@axonivy/inscription-protocol';
import { RestProperties } from './RestProperties';

describe('RestProperties', () => {
  function renderPart(data?: DeepPartial<RestRequestData>) {
    render(<RestProperties />, {
      wrapperProps: { data: data && { config: data }, meta: { restProperties: ['username', 'rester', '132'] } }
    });
  }

  test('empty', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Properties');
  });

  test('data', async () => {
    renderPart({ target: { properties: { rester: 'value' } } });
    await CollapsableUtil.assertOpen('Properties');
    TableUtil.assertRows(['rester value']);
    await ComboboxUtil.assertValue('rester');
    await ComboboxUtil.assertOptionsCount(3);
  });
});
