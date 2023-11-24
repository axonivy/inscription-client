import Tags from './Tags.js';
import { render, screen, userEvent, waitFor } from 'test-utils';

describe('Tags', () => {
  function renderTags(): {
    data: () => string[];
    rerender: () => void;
  } {
    let tags: string[] = [];
    userEvent.default.setup();
    const view = render(<Tags tags={['test', 'bla']} onChange={newTags => (tags = newTags)} />);
    return {
      data: () => tags,
      rerender: () => view.rerender(<Tags tags={tags} onChange={newTags => (tags = newTags)} />)
    };
  }

  function assertTags(expectedTags: string[]): Promise<void> {
    return waitFor(() => {
      const tags = screen.getAllByRole('gridcell');
      expect(tags).toHaveLength(expectedTags.length);
      expectedTags.forEach((expectedTag, index) => {
        expect(tags[index]).toHaveTextContent(expectedTag);
      });
    });
  }

  test('tags will render', async () => {
    renderTags();
    await assertTags(['test', 'bla']);
  });

  test('tags can be removed', async () => {
    const view = renderTags();

    const testTag = screen.getByRole('button', { name: /test/i });
    await userEvent.default.click(testTag);

    view.rerender();
    await assertTags(['bla']);
    expect(view.data()).toHaveLength(1);
  });

  test('tags can be added', async () => {
    const view = renderTags();

    const addTagBtn = screen.getByRole('button', { name: /Add new tag/i });
    await userEvent.default.click(addTagBtn);
    const popupInput = screen.getByLabelText('New Tag');
    await userEvent.default.type(popupInput, 'new tag');
    const popupCloseBtn = screen.getByRole('button', { name: /Close/i });
    await userEvent.default.click(popupCloseBtn);

    view.rerender();
    await assertTags(['test', 'bla', 'new tag']);
    expect(view.data()).toHaveLength(3);
    expect(view.data()[2]).toEqual('new tag');
  });

  test('tags can be handled with keyboard', async () => {
    const view = renderTags();

    await userEvent.default.tab();
    expect(screen.getByRole('button', { name: /test/i })).toHaveFocus();
    await userEvent.default.keyboard('[Enter]');

    view.rerender();
    await assertTags(['bla']);
    expect(view.data()).toHaveLength(1);

    await userEvent.default.tab();
    await userEvent.default.tab();
    expect(screen.getByRole('button', { name: /Add new tag/i })).toHaveFocus();
    await userEvent.default.keyboard('[Enter]');

    expect(screen.getByLabelText('New Tag')).toHaveFocus();
    await userEvent.default.keyboard('new tag');
    await userEvent.default.keyboard('[Enter]');

    expect(screen.getByRole('button', { name: /Add new tag/i })).toHaveFocus();
    view.rerender();
    await assertTags(['bla', 'new tag']);
    expect(view.data()).toHaveLength(2);
  });

  test('tags support readonly mode', async () => {
    render(<Tags tags={['test']} onChange={() => {}} />, { wrapperProps: { editor: { readonly: true } } });

    expect(screen.getByRole('button', { name: /test/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Add new tag/i })).toBeDisabled();
  });
});
