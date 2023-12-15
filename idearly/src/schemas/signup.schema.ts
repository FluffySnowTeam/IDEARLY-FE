import * as z from "zod";
import { SignupPageConfig } from "../constants";

export type RegisterSchemaType = z.infer<typeof SIGNUP_SCHEMA>;

export const SIGNUP_SCHEMA = z
  .object({
    email: z
      .string()
      .regex(SignupPageConfig.REGEX.email, "이메일 형식에 맞게 입력해주세요.")
      .nonempty("이메일을 입력해주세요.")
      .email("이메일 형식을 입력해주세요."),

    name: z
      .string()
      .min(2, "2자 이상 입력해주세요.")
      .regex(SignupPageConfig.REGEX.name, "이름을 입력해주세요.")
      .nonempty("이름을  입력해주세요."),

    password: z
      .string()
      .min(8, "8자 이상 입력해주세요.")
      .max(16, "16자 이하로 입력해주세요.")
      .nonempty("비밀번호를 입력해주세요.")
      .regex(
        SignupPageConfig.REGEX.password,
        "영문, 숫자, 특수문자를 조합해서 입력해주세요."
      ),

    confirmPassword: z.string().nonempty("비밀번호를 다시 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });
