import type { RestRequestData } from '@axonivy/inscription-protocol';
import type { DeepPartial } from 'test-utils';
import { render, screen } from 'test-utils';
import { RestJaxRsCode } from './RestJaxRsCode';
import { describe, test, expect } from 'vitest';

describe('RestEntityTypeCombobox', () => {
  function renderPart(data?: DeepPartial<RestRequestData>) {
    render(<RestJaxRsCode />, { wrapperProps: { data: data && { config: data } } });
  }

  test('empty', async () => {
    renderPart();
    expect(screen.getByLabelText('JAX-RS')).toHaveValue('');
  });

  test('data', async () => {
    renderPart({ code: 'hi' });
    expect(screen.getByLabelText('JAX-RS')).toHaveValue('hi');
  });
});
