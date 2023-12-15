export const SignupPageConfig = {
  title: "Welcome to the",
  SiteName: "IDEARLY",
  REGEX: {
    email: /^[a-z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/i,
    name: /^[가-힣]+(\s[가-힣]+)*$/,
    password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-?~.,/])(?=.*[0-9]).{8,30}$/,
  },
};
