import * as z from "zod";
import { SignupPageConfig } from "../constants";

export type RegisterSchemaType = z.infer<typeof MYPAGE_SCHEMA>;

export const MYPAGE_SCHEMA = z.object({
  name: z
    .string()
    .min(2, "2자 이상 입력해주세요.")
    .max(10, "10자 이하로 입력해주세요.")
    .regex(SignupPageConfig.REGEX.name, "한글로 입력해주세요.")
    .nonempty("이름을  입력해주세요."),
});
