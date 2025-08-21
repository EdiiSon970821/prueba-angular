import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { UserModel } from '../model/user.model';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject = new BehaviorSubject<boolean>(this.getAuthFromStorage());
  public auth$ = this.authSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  get isAuthenticated(): boolean {
    return this.authSubject.value;
  }

  login(email: string, password: string): Observable<UserType> {
    return this.http.get<UserModel[]>('assets/userLogin.json').pipe(
      map(users => users.find(u =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )),
      map(user => {
        if (user) this.setAuthenticate(true);
        return user;
      }),
      catchError(err => {
        console.error('Login error', err);
        return of(undefined);
      })
    );
  }

  logout(): void {
    this.setAuthenticate(false);
    this.router.navigate(['/auth/login']);
  }

  setAuthenticate(value: boolean): void {
    this.authSubject.next(value);
    localStorage.setItem('auth', value ? 'true' : 'false');
  }

  private getAuthFromStorage(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
}
