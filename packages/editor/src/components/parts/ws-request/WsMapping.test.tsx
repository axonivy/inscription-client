import type { DeepPartial } from 'test-utils';
import { render, TableUtil } from 'test-utils';
import { EMPTY_VAR_INFO, type WsRequestData } from '@axonivy/inscription-protocol';
import { WsMapping } from './WsMapping';
import { describe, test } from 'vitest';

describe('WsMapping', () => {
  function renderPart(data?: DeepPartial<WsRequestData>) {
    render(<WsMapping />, {
      wrapperProps: {
        data: data && { config: data },
        meta: {
          wsOperations: [
            { name: 'Super', parameter: EMPTY_VAR_INFO },
            { name: 'soaper', parameter: EMPTY_VAR_INFO }
          ]
        }
      }
    });
  }

  test('empty', async () => {
    renderPart();
    TableUtil.assertHeaders(['Attribute', 'Expression']);
  });

  test('data', async () => {
    renderPart({ operation: { parameters: { name: 'value' } } });
    TableUtil.assertRows(['⛔ name value']);
  });
});
