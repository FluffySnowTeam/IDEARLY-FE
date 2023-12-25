export interface ITestResult {
  testCaseId: number,
  input: string,
  expectedOutput: string,
  userOutput: string,
  status: string,
}

export interface IExecuteTest {
  testCaseId: number,
  status: string,
}