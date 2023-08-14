import { test } from '../../test';
import { screenshotTab } from '../utils/screenshot-util';

const START_PID = {
  START: '1562D1CBAC49CCF8-f0',
  SIGNAL: '16BBC3FED3A47640-f47',
  PROGRAM: '16C70B87DCB65433-f1',
  ERROR: '16BBC1007C5F8F69-f3'
} as const;

test.describe('Request Start', () => {
  test('Request Tab', async ({ view }) => {
    await screenshotTab(view, START_PID.START, 'Request', 'request-start-tab-request.png');
  });

  test('Trigger Tab', async ({ view }) => {
    await screenshotTab(view, START_PID.START, 'Trigger', 'request-start-tab-trigger.png');
  });

  test('Task Tab', async ({ view }) => {
    await screenshotTab(view, START_PID.START, 'Task', 'request-start-tab-task.png');
  });
});

test.describe('Signal Start', () => {
  test('Signal Tab', async ({ view }) => {
    await screenshotTab(view, START_PID.SIGNAL, 'Signal', 'signal-start-event-tab-signal.png');
  });
});

test.describe('Program Start', () => {
  test.skip('Start Tab', async ({ view }) => {
    await screenshotTab(view, START_PID.PROGRAM, 'Start', 'program-start-tab-start.png');
  });
});

test.describe('Error Start', () => {
  test('Error Tab', async ({ view }) => {
    await screenshotTab(view, START_PID.ERROR, 'Error', 'error-start-event-tab-error.png');
  });
});

test.describe('Web Service Process Start', () => {
  test.skip('Web Service Tab', async ({ view }) => {
    await screenshotTab(view, START_PID.ERROR, 'Web Service', 'web-service-process-start-tab-webservice.png');
  });

  test.skip('Task Tab', async ({ view }) => {
    await screenshotTab(view, START_PID.ERROR, 'Task', 'web-service-process-start-tab-task.png');
  });
});
