import { RestRequestData } from '@axonivy/inscription-protocol';
import { CollapsableUtil, DeepPartial, render, screen } from 'test-utils';
import { RestBody } from './RestBody';

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
