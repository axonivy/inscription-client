import { SelectUtil, render } from 'test-utils';
import { ProgramStartData } from '@axonivy/inscription-protocol';
import JavaClassSelector from './JavaClassSelector';

describe('StartPart', () => {
  function renderPart(data?: ProgramStartData) {
    render(<JavaClassSelector javaClass='' onChange={() => {}} type='START' />, {
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

  test('meta', async () => {
    renderPart();
    await SelectUtil.assertEmpty();
    await SelectUtil.assertOptionsCount(2);
  });
});