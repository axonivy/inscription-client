import type { InputType, RestRequestData, RestResource } from '@axonivy/inscription-protocol';
import type { DeepPartial} from 'test-utils';
import { CollapsableUtil, render, renderHook, screen, waitFor } from 'test-utils';
import { RestBody, useBodyTypes } from './RestBody.js';

describe('RestBody', () => {
  function renderPart(data?: DeepPartial<RestRequestData>) {
    render(<RestBody />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Body');
  });

  test('entity data', async () => {
    renderPart({ body: { type: 'ENTITY', mediaType: 'something' } });
    await CollapsableUtil.assertOpen('Body');
    expect(screen.getByRole('radio', { name: 'Entity' })).toBeChecked();
    expect(screen.getByLabelText('Entity-Type')).toBeInTheDocument();
  });

  test('form data', async () => {
    renderPart({ body: { type: 'FORM', mediaType: 'something' } });
    await CollapsableUtil.assertOpen('Body');
    expect(screen.getByRole('radio', { name: 'Form' })).toBeChecked();
    expect(screen.queryByLabelText('Entity-Type')).not.toBeInTheDocument();
  });

  test('raw data', async () => {
    renderPart({ body: { type: 'RAW', mediaType: 'something' } });
    await CollapsableUtil.assertOpen('Body');
    expect(screen.getByRole('radio', { name: 'Raw' })).toBeChecked();
    expect(screen.queryByLabelText('Entity-Type')).not.toBeInTheDocument();
  });
});

describe('useBodyTypes', () => {
  function renderTypesHook(currentType: InputType, restResource?: DeepPartial<RestResource>) {
    const view = renderHook(() => useBodyTypes(currentType), { wrapperProps: { meta: { restResource } } });
    return view.result;
  }

  test('no openapi', async () => {
    expect(renderTypesHook('ENTITY').current).toHaveLength(3);
  });

  test('form body', async () => {
    const restResource: DeepPartial<RestResource> = { method: { inBody: { media: 'multipart/form-data' } } };
    let result = renderTypesHook('FORM', restResource);
    await waitFor(() => expect(result.current).toHaveLength(0));
    result = renderTypesHook('RAW', restResource);
    await waitFor(() => expect(result.current).toHaveLength(3));
  }, 1000);

  test('entity body', async () => {
    const restResource: DeepPartial<RestResource> = { method: { inBody: { media: 'other' } } };
    let result = renderTypesHook('ENTITY', restResource);
    await waitFor(() => expect(result.current).toHaveLength(2));
    result = renderTypesHook('FORM', restResource);
    await waitFor(() => expect(result.current).toHaveLength(3));
  }, 1000);
});
