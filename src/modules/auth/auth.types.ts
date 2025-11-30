export interface SignUpData {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackUrl?: string;
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackUrl?: string;
}
