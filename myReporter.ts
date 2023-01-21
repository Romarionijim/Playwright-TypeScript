import {Reporter, TestCase, TestResult } from "@playwright/test/types/testReporter";

class myReporter implements Reporter {
    onTestBegin(test: TestCase): void {
        console.log(`Starting test ${test.title}`);
    }

    onTestEnd(test:TestCase,result:TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}`);
    }

    onEnd(result:any) {
        console.log(`Finished the run:${result.status}`);
    }
}

export default myReporter;