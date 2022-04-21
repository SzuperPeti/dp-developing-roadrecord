import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginUserAction } from '../../auth-store/auth.actions';

@Component({
  selector: 'dp-developing-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hasError = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('peter.drotos@allpacka.com',[Validators.email, Validators.required]),
      password: new FormControl('Petoka01', Validators.required),
    });
  }

  submit() {
    this.hasError = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.store
      .dispatch(new LoginUserAction(this.loginForm.value))
      .subscribe((state) => {
        if (state.Auth.user) {
          window.localStorage.setItem(
            'accessToken',
            state.Auth.user.accessToken
          );
          this.router.navigate(['products', 'products-list']);
        } else {
          this.hasError = true;
        }
      });
  }
}
