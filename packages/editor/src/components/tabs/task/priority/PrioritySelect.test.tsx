import PrioritySelect from './PrioritySelect';
import { Priority, PriorityLevel } from '@axonivy/inscription-protocol';
import { render, screen, SelectUtil } from 'test-utils';

describe('PrioritySelect', () => {
  function renderSelect(options?: { level?: string; script?: string }) {
    const priority: Priority = { level: options?.level as PriorityLevel, script: options?.script ?? '' };
    render(<PrioritySelect priority={priority} updatePriority={{ updateLevel: () => {}, updateScript: () => {} }} />);
  }

  test('priority select will render with default option', async () => {
    renderSelect();
    await SelectUtil.assertValue('Normal');
    await SelectUtil.assertOptionsCount(5);
  });

  test('priority select will render unknown value', async () => {
    renderSelect({ level: 'bla' });
    await SelectUtil.assertValue('Normal');
  });

  test('priority select input will not render', async () => {
    renderSelect({ level: 'LOW' });
    await SelectUtil.assertValue('Low');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('priority select input will render for script option', async () => {
    renderSelect({ level: 'SCRIPT', script: 'this is a script' });
    await SelectUtil.assertValue('Script');
    expect(screen.getByRole('textbox')).toHaveValue('this is a script');
  });
});
