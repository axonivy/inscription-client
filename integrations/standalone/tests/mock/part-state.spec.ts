import { test } from '../test';

test.describe('Part states', () => {
  test('different states on different parts', async ({ view }) => {
    await view.mock();
    const casePart = view.accordion('Case');
    const callPart = view.accordion('Call');

    await casePart.expectState('configured');
    await callPart.expectState('warning');

    await casePart.toggle();
    await casePart.macroInput('Name').clear();
    await casePart.expectState('error');
    await callPart.expectState('warning');

    await callPart.toggle();
    await callPart.combobox('Dialog').choose('AcceptRequest');
    await casePart.expectState('error');
    await callPart.expectState('configured');
  });
});
