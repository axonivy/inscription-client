import type { RestRequestData, RestResource } from '@axonivy/inscription-protocol';
import type { DeepPartial} from 'test-utils';
import { TableUtil, render, screen } from 'test-utils';
import { RestForm } from './RestForm';

describe('RestForm', () => {
  function renderPart(data?: DeepPartial<RestRequestData>, restResource?: DeepPartial<RestResource>) {
    render(<RestForm />, { wrapperProps: { data: data && { config: data }, meta: { restResource } } });
  }

  test('empty', async () => {
    renderPart();
    TableUtil.assertRows([]);
  });

  test('data', async () => {
    renderPart({ body: { form: { bla: ['123'] } } });
    TableUtil.assertRows(['bla 123']);
  });

  test('openapi', async () => {
    renderPart(
      { body: { form: { test: ['123'] } } },
      {
        method: {
          inBody: { type: { name: 'para', properties: [{ name: 'test', type: { fullQualifiedName: 'Boolean' }, doc: 'test desc' }] } }
        }
      }
    );
    await screen.findByText('Boolean');
    TableUtil.assertRows(['test desc']);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('test');
    expect(screen.getAllByRole('textbox')[0]).toBeDisabled();
    expect(screen.getAllByRole('button', { name: 'Remove row' })[0]).toBeDisabled();
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('123');
    expect(screen.getAllByRole('textbox')[1]).toBeEnabled();
  });
});
