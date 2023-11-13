import type { DeepPartial} from 'test-utils';
import { render, SelectUtil } from 'test-utils';
import type { WsRequestData } from '@axonivy/inscription-protocol';
import { WsOperationSelect } from './WsOperationSelect';

describe('WsOperationSelect', () => {
  function renderPart(data?: DeepPartial<WsRequestData>) {
    render(<WsOperationSelect />, {
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
    await SelectUtil.assertEmpty({ label: 'Operation' });
  });

  test('unknown', async () => {
    renderPart({ operation: { name: 'unknown' } });
    await SelectUtil.assertValue('unknown');
    await SelectUtil.assertOptionsCount(2);
  });

  test('data', async () => {
    renderPart({ operation: { name: 'name' } });
    await SelectUtil.assertValue('name');
    await SelectUtil.assertOptionsCount(2);
  });
});
