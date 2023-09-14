import { render, DeepPartial, TableUtil } from 'test-utils';
import { WsRequestData } from '@axonivy/inscription-protocol';
import { WsMapping } from './WsMapping';

describe('WsMapping', () => {
  function renderPart(data?: DeepPartial<WsRequestData>) {
    render(<WsMapping />, {
      wrapperProps: {
        data: data && { config: data },
        meta: {
          wsOperations: [
            { name: 'Super', parameter: { types: {}, variables: [] } },
            { name: 'soaper', parameter: { types: {}, variables: [] } }
          ]
        }
      }
    });
  }

  test('empty', async () => {
    renderPart();
    TableUtil.assertHeaders(['Attribute', 'Type', 'Expression']);
  });

  test('data', async () => {
    renderPart({ operation: { parameters: { name: 'value' } } });
    TableUtil.assertRows(['⛔ name value']);
  });
});
