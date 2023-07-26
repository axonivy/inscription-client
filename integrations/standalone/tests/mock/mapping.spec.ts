import { test } from '@playwright/test';
import { selectDialog } from './combobox-util';
import { InscriptionView } from '../pageobjects/InscriptionView';

test.describe('Mappings', () => {
  test('DialogCall change will update mapping tree', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock();
    const callPart = inscriptionView.accordion('Call');
    await callPart.toggle();

    await selectDialog(page, 'AcceptRequest');
    const callTable = callPart.table(['text', 'label', 'expression']);
    await callTable.expectRowCount(11);

    await selectDialog(page, 'test1');
    await callTable.expectRowCount(3);
  });

  test('SubStart result param change will update mapping tree', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock({ type: 'CallSubStart' });
    const resultPart = inscriptionView.accordion('Result');
    await resultPart.toggle();

    const resultTable = resultPart.table(['text', 'label', 'expression']);
    await resultTable.expectRowCount(1);

    const params = resultPart.section('Result parameters');
    await params.toggle();
    const paramTable = params.table(['text', 'label', 'expression']);
    await paramTable.expectRowCount(0);

    await paramTable.addRow();
    await params.toggle();
    await resultTable.expectRowCount(2);

    await params.toggle();
    await paramTable.clear();
    await resultTable.expectRowCount(1);
  });
});
