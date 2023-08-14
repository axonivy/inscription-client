import { test } from '../../test';
import {
  CaseTest,
  CodeTest,
  DialogCallTest,
  NameTest,
  NameTestWithoutTags,
  OutputTest,
  ScriptOutputTest,
  SubCallTest,
  TaskTest,
  TriggerCallTest,
  fillReloadAndAssert
} from '../parts';

test.describe('Workflow Activities', () => {
  test('User Task', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f4');
    await view.expectHeaderText('User Task');
    await fillReloadAndAssert(view, [NameTest, TaskTest, CaseTest, DialogCallTest, OutputTest]);
  });

  test('Dialog Call', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f2');
    await view.expectHeaderText('User Dialog');
    await fillReloadAndAssert(view, [NameTest, DialogCallTest, OutputTest]);
  });

  test('Script', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f5');
    await view.expectHeaderText('Script');
    await fillReloadAndAssert(view, [NameTest, ScriptOutputTest, CodeTest]);
  });

  test('Embedded Sub', async ({ view }) => {
    await view.selectElement('0169A49845D37011-S10');
    await view.expectHeaderText('Sub');
    await fillReloadAndAssert(view, [NameTestWithoutTags]);
  });

  test('Call Sub', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f19');
    await view.expectHeaderText('Call');
    await fillReloadAndAssert(view, [NameTest, SubCallTest, OutputTest]);
  });

  test('Trigger', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f21');
    await view.expectHeaderText('Trigger');
    await fillReloadAndAssert(view, [NameTest, TriggerCallTest, OutputTest]);
  });
});
