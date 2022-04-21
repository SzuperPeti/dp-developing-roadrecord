import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LogoutUserAction } from '../../auth/auth-store/auth.actions';
import { AuthState } from '../../auth/auth-store/auth.state';

@Component({
  selector: 'dp-developing-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: Observable<boolean>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(AuthState.isLoggedIn);
  }

  logout() {
    this.store.dispatch(new LogoutUserAction());
    this.router.navigate(['authentication', 'login']);
  }
}
