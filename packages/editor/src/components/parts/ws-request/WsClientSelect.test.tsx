import { render, DeepPartial, SelectUtil } from 'test-utils';
import { WsRequestData } from '@axonivy/inscription-protocol';
import { WsClientSelect } from './WsClientSelect';

describe('WsClientSelect', () => {
  function renderPart(data?: DeepPartial<WsRequestData>) {
    render(<WsClientSelect />, {
      wrapperProps: {
        data: data && { config: data },
        meta: {
          wsClients: [
            { clientId: 'client1', name: 'Super' },
            { clientId: 'name', name: 'soaper' }
          ]
        }
      }
    });
  }

  test('empty', async () => {
    renderPart();
    await SelectUtil.assertEmpty({ label: 'Client' });
  });

  test('unknown', async () => {
    renderPart({ clientId: 'unknown' });
    await SelectUtil.assertValue('unknown');
    await SelectUtil.assertOptionsCount(2);
  });

  test('data', async () => {
    renderPart({ clientId: 'name' });
    await SelectUtil.assertValue('name');
    await SelectUtil.assertOptionsCount(2);
  });
});
