export interface ItestResult {
  testCaseId: number,
  input: string,
  expectedOutput: string,
  userOutput: string,
  status: string,
}