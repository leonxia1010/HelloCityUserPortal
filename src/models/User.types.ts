import { Genders } from "@/enums/UserAttributes";

export type User = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  gender: Genders | '';
  nationality: string;
  city: string;
  language: string;
};
