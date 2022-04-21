import { LoginRequestInterface } from "../../shared/models/auth/login-request.interface";
import { RegisterRequestInterface } from "../../shared/models/auth/register-request.interface";
import { UserInterface } from "../../shared/models/auth/user.interface";


export class LoginUserAction {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginRequestInterface) {}
}

export class LoginUserSuccessAction {
  static readonly type = '[Auth] Login Success';
  constructor(public payload: UserInterface) {}
}

export class LogoutUserAction {
  static readonly type = '[Auth] Logout';
}

export class RegisterUserAction {
  static readonly type = '[Auth] Register';
  constructor(public payload: RegisterRequestInterface) {}
}
