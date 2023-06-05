import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class MyReporter implements Reporter {
  onTestBegin(test: TestCase) {
    test.title += ` [${test.titlePath()[1]}]`;
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    console.log(`Test: ${test.titlePath().slice(2).join(' > ')}`);
    console.log(`>> ${result.status}`);
  }
}
export default MyReporter;
