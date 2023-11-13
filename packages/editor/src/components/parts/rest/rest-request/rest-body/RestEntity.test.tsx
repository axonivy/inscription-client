import type { RestRequestData, VariableInfo } from '@axonivy/inscription-protocol';
import type { DeepPartial} from 'test-utils';
import { ComboboxUtil, TableUtil, render, screen } from 'test-utils';
import { RestEntity } from './RestEntity';

describe('RestEntity', () => {
  function renderPart(data?: DeepPartial<RestRequestData>) {
    const restEntityInfo: VariableInfo = {
      variables: [
        {
          attribute: 'param',
          type: 'String',
          simpleType: 'String',
          description: ''
        }
      ],
      types: {}
    };
    render(<RestEntity />, { wrapperProps: { data: data && { config: data }, meta: { restEntityInfo } } });
  }

  test('empty', async () => {
    renderPart();
    await screen.findByText('param');
    TableUtil.assertRows(['param String']);
    expect(screen.getByLabelText('Code')).toHaveValue('');
  });

  test('data', async () => {
    renderPart({ body: { entity: { code: 'hi', type: 'String', map: { 'param.bla': '123', param: 'test' } } } });
    await screen.findByText('param');
    await ComboboxUtil.assertValue('String');
    TableUtil.assertRows(['param String test', '⛔ bla 123']);
    expect(screen.getByLabelText('Code')).toHaveValue('hi');
  });
});
