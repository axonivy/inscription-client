import type { RestRequestData, RestResource } from '@axonivy/inscription-protocol';
import { RestParameters } from './RestParameters.js';
import type { DeepPartial} from 'test-utils';
import { CollapsableUtil, SelectUtil, TableUtil, render, screen } from 'test-utils';

describe('RestParameters', () => {
  function renderParameters(data?: DeepPartial<RestRequestData>, restResource?: DeepPartial<RestResource>) {
    render(<RestParameters />, {
      wrapperProps: { data: data && { config: data }, meta: { restResource } }
    });
  }

  test('empty', async () => {
    renderParameters();
    await CollapsableUtil.assertClosed('Parameters');
  });

  test('data', async () => {
    renderParameters({ target: { queryParams: { queryParam: 'query' }, templateParams: { pathParam: 'path' } } });
    await CollapsableUtil.assertOpen('Parameters');
    TableUtil.assertRows(['pathParam path', 'queryParam query']);
    await SelectUtil.assertValue('Path', { index: 0 });
    await SelectUtil.assertOptionsCount(2, { index: 0 });
    expect(SelectUtil.select({ index: 0 })).not.toBeDisabled();
    await SelectUtil.assertValue('Query', { index: 1 });
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('pathParam');
    expect(screen.getAllByRole('textbox')[0]).not.toBeDisabled();
    expect(screen.getAllByRole('button', { name: 'Remove row' })[0]).not.toBeDisabled();
  });

  test('data - openapi', async () => {
    renderParameters(undefined, {
      pathParams: [{ name: 'pathParam', type: { fullQualifiedName: 'Number' }, doc: 'path param', required: true }],
      queryParams: [{ name: 'queryParam', type: { fullQualifiedName: 'String' }, doc: 'query param', required: false }]
    });
    await screen.findByText('Kind');
    TableUtil.assertRows(['* required\npath param', 'query param']);
    expect(SelectUtil.select({ index: 0 })).toBeDisabled();
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('pathParam');
    expect(screen.getAllByRole('textbox')[0]).toBeDisabled();
    expect(screen.getAllByRole('button', { name: 'Remove row' })[0]).toBeDisabled();
  });
});
