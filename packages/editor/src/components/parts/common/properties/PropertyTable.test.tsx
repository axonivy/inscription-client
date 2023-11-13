import { ComboboxUtil, render, TableUtil } from 'test-utils';
import { PropertyTable } from './PropertyTable';
import type { ScriptMappings } from '@axonivy/inscription-protocol';

describe('PropertyTable', () => {
  function renderPart(data: ScriptMappings, hide?: string[]) {
    render(<PropertyTable properties={data} update={() => {}} knownProperties={['Super', 'soaper', '132']} hideProperties={hide} />);
  }

  test('properties', async () => {
    renderPart({ soaper: 'value', test: 'bla' });
    TableUtil.assertRows(['soaper value', 'test bla']);
  });

  test('hide', async () => {
    renderPart({ soaper: 'value', test: 'bla' }, ['test']);
    TableUtil.assertRows(['soaper value']);
  });

  test('knownProperties', async () => {
    renderPart({ soaper: 'value' });
    await ComboboxUtil.assertValue('soaper');
    await ComboboxUtil.assertOptionsCount(3);
  });
});
