import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { CaseTest, NameTest, NameTestWithoutTags, OutputTest, StartRequestTaskTest, WsStartTaskTest, fillReloadAndAssert } from '../parts';
import { ErrorCatchTest } from '../parts/error-catch';
import { MethodResultTest, ResultTest } from '../parts/result';
import { SignalCatchTest } from '../parts/signal-catch';
import { MethodStartTest, StartTest } from '../parts/start';
import { RequestTest } from '../parts/request';
import { TriggerTest } from '../parts/trigger';

test.describe('Start Events', () => {
  test('Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f15');
    await inscriptionView.expectHeaderText('Start');
    await fillReloadAndAssert(inscriptionView, [NameTest, StartTest, RequestTest, TriggerTest, StartRequestTaskTest, CaseTest]);
  });

  test('Signal Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f4');
    await inscriptionView.expectHeaderText('Signal Start');
    await fillReloadAndAssert(inscriptionView, [NameTest, SignalCatchTest, OutputTest]);
  });

  test('Error Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f3');
    await inscriptionView.expectHeaderText('Error Start');
    await fillReloadAndAssert(inscriptionView, [NameTest, ErrorCatchTest, OutputTest]);
  });

  test('Program Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f2');
    await inscriptionView.expectHeaderText('Program Start');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });

  test('Embedded Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-S10-g0');
    await inscriptionView.expectHeaderText('Embedded Start');
    await fillReloadAndAssert(inscriptionView, [NameTestWithoutTags]);
  });

  test('Sub Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4A2A4DC8B908-f0');
    await inscriptionView.expectHeaderText('Sub Start');
    await fillReloadAndAssert(inscriptionView, [NameTest, StartTest, ResultTest]);
  });

  test('WS Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4A3BFDC7DFFE-ws0');
    await inscriptionView.expectHeaderText('WS Start');
    await fillReloadAndAssert(inscriptionView, [NameTest, StartTest, ResultTest, WsStartTaskTest, CaseTest]);
  });

  test('Init Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('167356B1245C7158-f0');
    await inscriptionView.expectHeaderText('Init Start');
    await fillReloadAndAssert(inscriptionView, [NameTest, StartTest, ResultTest]);
  });

  test('Method Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('167356B1245C7158-f6');
    await inscriptionView.expectHeaderText('Method Start');
    await fillReloadAndAssert(inscriptionView, [NameTest, MethodStartTest, MethodResultTest]);
  });

  test('Event Start', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('167356B1245C7158-f3');
    await inscriptionView.expectHeaderText('Event Start');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest]);
  });
});
