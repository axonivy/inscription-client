import { RestRequestData } from '@axonivy/inscription-protocol';
import { ComboboxUtil, DeepPartial, render } from 'test-utils';
import { RestContentType } from './RestContentType';

describe('RestContentType', () => {
  function renderPart(data?: DeepPartial<RestRequestData>) {
    render(<RestContentType />, { wrapperProps: { data: data && { config: data }, meta: { restContentTypes: ['test', 'other'] } } });
  }

  test('empty', async () => {
    renderPart();
    await ComboboxUtil.assertValue('application/json');
    await ComboboxUtil.assertOptionsCount(2);
  });

  test('unknown value', async () => {
    renderPart({ body: { mediaType: 'unknown' } });
    await ComboboxUtil.assertValue('unknown');
  });

  test('known value', async () => {
    renderPart({ body: { mediaType: 'test' } });
    await ComboboxUtil.assertValue('test');
  });
});
