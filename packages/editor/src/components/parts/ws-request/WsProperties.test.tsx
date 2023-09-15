import { render, DeepPartial, SelectUtil, CollapsableUtil, TableUtil } from 'test-utils';
import { WsRequestData } from '@axonivy/inscription-protocol';
import { WsProperties } from './WsProperties';

describe('WsProperties', () => {
  function renderPart(data?: DeepPartial<WsRequestData>) {
    render(<WsProperties />, { wrapperProps: { data: data && { config: data }, meta: { wsProperties: ['Super', 'soaper', '132'] } } });
  }

  test('empty', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Properties');
  });

  test('data', async () => {
    renderPart({ properties: { soaper: 'value' } });
    await CollapsableUtil.assertOpen('Properties');
    TableUtil.assertRows(['value']);
    await SelectUtil.assertValue('soaper');
    await SelectUtil.assertOptionsCount(3);
  });
});
