import { EventEmitter } from '@angular/core';

export class FakeAuth {
  auth = false;
  loginMsg = '';

  loginEmitter = new EventEmitter<string>();
  setTimeoutEmitter = new EventEmitter<string>();
  logoutEmitter = new EventEmitter<boolean>();
  authEmitter = new EventEmitter<boolean>();

  isAuth() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.auth);
    });
    return promise;
  }

  login() {
    this.auth = true;
    this.loginMsg = 'You have been successfully logged In';
    setTimeout(() => {
      this.loginMsg = '';
      this.setTimeoutEmitter.emit(this.loginMsg);
    }, 2000);
    this.loginEmitter.emit(this.loginMsg);
    this.authEmitter.emit(this.auth);
  }
  logout() {
    this.auth = false;
    this.loginMsg = 'You have been successfully logged Out';
    setTimeout(() => {
      this.loginMsg = '';
      this.setTimeoutEmitter.emit(this.loginMsg);
    }, 2000);
    this.loginEmitter.emit(this.loginMsg);
    this.authEmitter.emit(this.auth);

  }
}
