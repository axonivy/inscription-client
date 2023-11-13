import CallSelect from './CallSelect';
import { render, screen, userEvent } from 'test-utils';
import type { CallableStart } from '@axonivy/inscription-protocol';

describe('CallSelect', () => {
  const DEPRECATED_STYLE = 'text-decoration: line-through';

  function renderCallSelect(selected: string) {
    const items: CallableStart[] = [
      {
        id: 'start1',
        process: '',
        packageName: '',
        description: '',
        startName: '',
        project: '',
        deprecated: false,
        callParameter: {
          variables: [],
          types: {}
        }
      },
      {
        id: 'deprecated',
        process: '',
        packageName: '',
        description: '',
        startName: '',
        project: '',
        deprecated: true,
        callParameter: {
          variables: [],
          types: {}
        }
      }
    ];
    //@ts-ignore
    render(<CallSelect start={selected} starts={items} onChange={() => {}} startIcon='' />);
  }

  test('deprecated option', async () => {
    renderCallSelect('start1');
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveValue('start1');
    expect(combobox).not.toHaveStyle(DEPRECATED_STYLE);

    const button = screen.getByRole('button', { name: 'toggle menu' });
    await userEvent.click(button);
    const menu = screen.getByRole('listbox');
    expect(menu).not.toBeEmptyDOMElement();
    const items = screen.getAllByRole('option');
    expect(items[0]).not.toHaveStyle(DEPRECATED_STYLE);
    expect(items[1]).not.toHaveStyle(DEPRECATED_STYLE);
  });

  test('deprecated selection', async () => {
    renderCallSelect('deprecated');
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveValue('deprecated');
    expect(combobox).toHaveStyle(DEPRECATED_STYLE);
  });
});
