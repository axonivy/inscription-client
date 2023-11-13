import { CardArea, CardText } from './CardText';
import { render, screen } from 'test-utils';
import { describe, test, expect } from 'vitest';

describe('CardText', () => {
  function renderText(text: string) {
    render(
      <>
        <label id='label' htmlFor='text'>
          Label
        </label>
        <CardText id='text' aria-labelledby='label' value={text} />
      </>
    );
  }

  test('text', async () => {
    renderText('Hello World');
    expect(screen.getByLabelText('Label')).toHaveTextContent('Hello World');
  });

  test('text with makros', async () => {
    renderText('Hello <%= in.accept %> World <%=ivy.cms.co("/bla")%>');
    expect(screen.getByLabelText('Label')).toHaveTextContent('Hello in.accept World ivy.cms.co("/bla")');
  });
});

describe('CardArea', () => {
  function renderArea(text: string) {
    render(
      <>
        <label id='label' htmlFor='text'>
          Label
        </label>
        <CardArea id='text' aria-labelledby='label' value={text} />
      </>
    );
  }

  test('area', async () => {
    renderArea('Hello \nWorld');
    expect(screen.getByLabelText('Label')).toHaveTextContent('Hello World');
    const lines = screen.getAllByRole('row');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toHaveTextContent('Hello');
    expect(lines[1]).toHaveTextContent('World');
  });

  test('area with makros', async () => {
    renderArea('Hello <%= in.accept %> World \n<%=ivy.cms.co("/bla")%>');
    expect(screen.getByLabelText('Label')).toHaveTextContent('Hello in.accept World ivy.cms.co("/bla")');
    const lines = screen.getAllByRole('row');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toHaveTextContent('Hello in.accept World');
    expect(lines[1]).toHaveTextContent('ivy.cms.co("/bla")');
  });
});
