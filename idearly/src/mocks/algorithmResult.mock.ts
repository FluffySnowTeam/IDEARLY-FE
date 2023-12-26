export const executeResult = {
  status: "success",
  data: {
    correct: true,
    testcases: [
      {
        testCaseId: 1,
        status: "pass",
      },
      {
        testCaseId: 2,
        status: "pass",
      },
      {
        testCaseId: 3,
        status: "pass",
      },
      {
        testCaseId: 4,
        status: "failed",
      },
    ],
  },
};

export const testResult = {
  status: "success",
  data: [
    {
      testCaseId: 1,
      input: "[1, 1, 3, 3, 0, 1, 1]",
      expectedOutput: "[1, 3, 0, 1]",
      userOutput: "[1, 3, 0, 1]",
      status: "pass",
    },
    {
      testCaseId: 2,
      input: "[4, 4, 4, 3, 3]",
      expectedOutput: "[4, 3]",
      userOutput: "[4, 2]",
      status: "failed",
    },
  ],
};
