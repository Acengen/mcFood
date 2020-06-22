import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/Auth/AuthGuard.service';
import { FakeAuth } from 'src/app/Auth/FakeAuth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  auth: boolean;
  constructor(private authService: FakeAuth) {}
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.auth = this.authService.auth;
    this.authService.authEmitter.subscribe((auth: boolean) => {
      this.auth = auth;
    });
  }
}
