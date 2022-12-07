import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tags from './Tags';

describe('Tags', () => {
  function renderTags(onChange: (tags: string[]) => void = () => {}) {
    const tags = ['test', 'bla'];
    userEvent.setup();
    render(<Tags tags={tags} onChange={onChange} />);
  }

  function assertTags(expectedTags: string[]): void {
    const tags = screen.getAllByRole('gridcell');
    expect(tags).toHaveLength(expectedTags.length);
    expectedTags.forEach((expectedTag, index) => {
      expect(tags[index]).toHaveTextContent(expectedTag);
    });
  }

  test('tags will render', () => {
    renderTags();
    assertTags(['test', 'bla']);
  });

  test('tags can be removed', async () => {
    let data: string[] = [];
    renderTags((change: string[]) => (data = change));

    const testTag = screen.getByRole('button', { name: /test/i });
    await userEvent.click(testTag);

    assertTags(['bla']);
    expect(data).toHaveLength(1);
  });

  test('tags can be added', async () => {
    let data: string[] = [];
    renderTags((change: string[]) => (data = change));

    const addTagBtn = screen.getByRole('button', { name: /Add new tag/i });
    await userEvent.click(addTagBtn);
    const popupInput = screen.getByLabelText('New Tag');
    await userEvent.type(popupInput, 'new tag');
    const popupCloseBtn = screen.getByRole('button', { name: /Close/i });
    await userEvent.click(popupCloseBtn);

    assertTags(['test', 'bla', 'new tag']);
    expect(data).toHaveLength(3);
    expect(data[2]).toEqual('new tag');
  });

  test('tags can be handled with keyboard', async () => {
    let data: string[] = [];
    renderTags((change: string[]) => (data = change));

    await userEvent.tab();
    expect(screen.getByRole('button', { name: /test/i })).toHaveFocus();
    await userEvent.keyboard('[Enter]');

    assertTags(['bla']);
    expect(data).toHaveLength(1);

    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: /Add new tag/i })).toHaveFocus();
    await userEvent.keyboard('[Enter]');

    expect(screen.getByLabelText('New Tag')).toHaveFocus();
    await userEvent.keyboard('new tag');
    await userEvent.keyboard('[Enter]');

    expect(screen.getByRole('button', { name: /Add new tag/i })).toHaveFocus();
    assertTags(['bla', 'new tag']);
    expect(data).toHaveLength(2);
  });
});
