import { CollapsableUtil, SelectUtil, render } from 'test-utils';
import type { ProgramStartData } from '@axonivy/inscription-protocol';
import JavaClassSelector from './JavaClassSelector';
import { describe, test } from 'vitest';

describe('StartPart', () => {
  function renderPart(data?: Partial<ProgramStartData>) {
    render(<JavaClassSelector javaClass={data?.javaClass ?? ''} onChange={() => {}} type='START' />, {
      wrapperProps: {
        data: data && { config: data },
        meta: {
          javaClasses: [
            { fullQualifiedName: 'This is the full name', name: 'this is the name', packageName: 'coolpackage' },
            { fullQualifiedName: 'Amazing Fullname', name: 'Name is okay', packageName: 'Packagename' }
          ]
        }
      }
    });
  }

  test('empty', async () => {
    renderPart();
    await CollapsableUtil.assertClosed('Java Class');
  });

  test('meta', async () => {
    renderPart({ javaClass: 'bla' });
    await SelectUtil.assertEmpty();
    await SelectUtil.assertOptionsCount(2);
  });
});
