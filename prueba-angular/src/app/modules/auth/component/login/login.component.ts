import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { delay, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm!: FormGroup;
  isLoading: boolean = false;
  loginError!: string;
  returnUrl!: string;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['admin@admin.com', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email]],
      password: ['admin', [Validators.required]],
    })
  }

  onSubmit() {
    this.loginError = '';
   if (this.loginForm.invalid) return;
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    const formSubscr = this.authService.login(email, password).pipe(delay(500)).subscribe(user => {
      this.isLoading = false;
      if (user) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.loginError = 'Credenciales incorrectas';
      }
    }, err => {
      this.isLoading = false;
      this.loginError = 'Error en el inicio de sesión';
    });
    this.unsubscribe.push(formSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
