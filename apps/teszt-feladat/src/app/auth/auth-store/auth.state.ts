import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserInterface } from '../../shared/models/auth/user.interface';
import { AuthService } from '../../shared/services/auth.service';
import { LoginUserAction, LogoutUserAction } from './auth.actions';

export interface AuthStateModel {
  isLoggedIn: boolean;
  user: UserInterface | null;
}

@State<AuthStateModel>({
  name: 'Auth',
  defaults: {
    isLoggedIn: false,
    user: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return state.isLoggedIn;
  }

  @Selector()
  static getToken(state: AuthStateModel) {
    return state.user?.accessToken;
  }

  constructor(private authService: AuthService, private router: Router) {}

  @Action(LoginUserAction)
  login({ patchState }: StateContext<AuthStateModel>, { payload }: LoginUserAction) {
    return this.authService.login(payload).pipe(
      tap((result: UserInterface) => {
        patchState({
          user: result,
          isLoggedIn: true
        });
      }),
      catchError((error: HttpErrorResponse) => {
        return of(error)
      })
    );
  }

  @Action(LogoutUserAction)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          ...state,
          user: null,
          isLoggedIn: false
        });
      })
    );
  }
}
