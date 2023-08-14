import { test } from '../../test';
import { CaseTest, NameTest, NameTestWithoutTags, OutputTest, StartRequestTaskTest, WsStartTaskTest, fillReloadAndAssert } from '../parts';
import { ErrorCatchTest } from '../parts/error-catch';
import { MethodResultTest, ResultTest } from '../parts/result';
import { SignalCatchTest } from '../parts/signal-catch';
import { MethodStartTest, StartTest } from '../parts/start';
import { RequestTest } from '../parts/request';
import { TriggerTest } from '../parts/trigger';

test.describe('Start Events', () => {
  test('Start', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f15');
    await view.expectHeaderText('Start');
    await fillReloadAndAssert(view, [NameTest, StartTest, RequestTest, TriggerTest, StartRequestTaskTest, CaseTest]);
  });

  test('Signal Start', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f4');
    await view.expectHeaderText('Signal Start');
    await fillReloadAndAssert(view, [NameTest, SignalCatchTest, OutputTest]);
  });

  test('Error Start', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f3');
    await view.expectHeaderText('Error Start');
    await fillReloadAndAssert(view, [NameTest, ErrorCatchTest, OutputTest]);
  });

  test('Program Start', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f2');
    await view.expectHeaderText('Program Start');
    await fillReloadAndAssert(view, [NameTest]);
  });

  test('Embedded Start', async ({ view }) => {
    await view.selectElement('0169A49845D37011-S10-g0');
    await view.expectHeaderText('Embedded Start');
    await fillReloadAndAssert(view, [NameTestWithoutTags]);
  });

  test('Sub Start', async ({ view }) => {
    await view.selectElement('169A4A2A4DC8B908-f0');
    await view.expectHeaderText('Sub Start');
    await fillReloadAndAssert(view, [NameTest, StartTest, ResultTest]);
  });

  test('WS Start', async ({ view }) => {
    await view.selectElement('169A4A3BFDC7DFFE-ws0');
    await view.expectHeaderText('WS Start');
    await fillReloadAndAssert(view, [NameTest, StartTest, ResultTest, WsStartTaskTest, CaseTest]);
  });

  test('Init Start', async ({ view }) => {
    await view.selectElement('167356B1245C7158-f0');
    await view.expectHeaderText('Init Start');
    await fillReloadAndAssert(view, [NameTest, StartTest, ResultTest]);
  });

  test('Method Start', async ({ view }) => {
    await view.selectElement('167356B1245C7158-f6');
    await view.expectHeaderText('Method Start');
    await fillReloadAndAssert(view, [NameTest, MethodStartTest, MethodResultTest]);
  });

  test('Event Start', async ({ view }) => {
    await view.selectElement('167356B1245C7158-f3');
    await view.expectHeaderText('Event Start');
    await fillReloadAndAssert(view, [NameTest, OutputTest]);
  });
});
