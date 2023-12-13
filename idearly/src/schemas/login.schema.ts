import * as z from "zod";
import { SignupPageConfig } from "../constants";

export type RegisterSchemaType = z.infer<typeof LOGIN_SCHEMA>;

export const LOGIN_SCHEMA = z.object({
  email: z
    .string()
    .regex(SignupPageConfig.REGEX.email, "이메일 형식에 맞게 입력해주세요.")
    .nonempty("이메일을 입력해주세요.")
    .email("이메일 형식을 입력해주세요."),

  password: z
    .string()
    .min(8, "8자 이상 입력해주세요.")
    .max(16, "16자 이하로 입력해주세요.")
    .nonempty("비밀번호를 입력해주세요.")
    .regex(
      SignupPageConfig.REGEX.password,
      "영문, 숫자, 특수문자를 조합해서 입력해주세요."
    ),
});
