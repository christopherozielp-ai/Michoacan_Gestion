import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export type UserRole = 'dueno' | 'gerente' | 'cajero';

export interface AuthSession {
  token: string;
  role: UserRole;
  user: {
    id: string;
    name: string;
    email?: string;
    employeeId?: string;
  };
  expiresAt: number; // Timestamp en milisegundos
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  // Signals para estado reactivo
  readonly activeRole = signal<UserRole>('dueno');
  readonly showPassword = signal(false);
  readonly isLoading = signal(false);
  readonly loginError = signal<string | null>(null);
  readonly successSession = signal<AuthSession | null>(null);

  // Formulario Reactivo dinámico según el rol
  readonly loginForm: FormGroup = this.fb.group({
    email: ['admin@michoacana.com', [Validators.required, Validators.email]],
    employeeId: ['GER-101', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    pin: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    rememberMe: [false]
  });

  constructor() {
    this.updateFormValidators('dueno');
  }

  // Cambiar pestaña de rol (Dueño vs Gerente vs Cajero)
  setRole(role: UserRole): void {
    if (this.activeRole() === role) return;
    
    this.activeRole.set(role);
    this.loginError.set(null);
    this.updateFormValidators(role);
  }

  private updateFormValidators(role: UserRole): void {
    const emailControl = this.loginForm.get('email');
    const employeeIdControl = this.loginForm.get('employeeId');
    const passwordControl = this.loginForm.get('password');
    const pinControl = this.loginForm.get('pin');

    // Limpiar todos primero
    emailControl?.clearValidators();
    employeeIdControl?.clearValidators();
    passwordControl?.clearValidators();
    pinControl?.clearValidators();

    if (role === 'dueno') {
      emailControl?.setValidators([Validators.required, Validators.email]);
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
    } else if (role === 'gerente') {
      employeeIdControl?.setValidators([Validators.required, Validators.minLength(3)]);
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
    } else if (role === 'cajero') {
      employeeIdControl?.setValidators([Validators.required, Validators.minLength(3)]);
      pinControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{4}$')]);
    }

    emailControl?.updateValueAndValidity();
    employeeIdControl?.updateValueAndValidity();
    passwordControl?.updateValueAndValidity();
    pinControl?.updateValueAndValidity();
  }

  toggleShowPassword(): void {
    this.showPassword.update(val => !val);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.loginError.set(null);
    this.successSession.set(null);

    const role = this.activeRole();
    const { email, employeeId, password, pin, rememberMe } = this.loginForm.value;

    // Simulación de autenticación (API llamada al backend)
    setTimeout(() => {
      this.isLoading.set(false);

      if (role === 'dueno') {
        if (email === 'admin@michoacana.com' && password === '123456') {
          const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 1 Día
          const session: AuthSession = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dueno_token_sample',
            role: 'dueno',
            user: { id: 'OWNER-01', name: 'Don Carlos (Dueño)', email },
            expiresAt: Date.now() + ONE_DAY_MS
          };
          this.handleSuccessfulLogin(session, rememberMe);
        } else {
          this.loginError.set('Credenciales de Dueño incorrectas. Prueba: admin@michoacana.com / 123456');
        }
      } else if (role === 'gerente') {
        if (employeeId.toUpperCase() === 'GER-101' && password === 'gerente123') {
          const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;
          const session: AuthSession = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.gerente_token_sample',
            role: 'gerente',
            user: { id: 'GER-101', name: 'María González (Gerente)', employeeId: employeeId.toUpperCase() },
            expiresAt: Date.now() + EIGHT_HOURS_MS
          };
          this.handleSuccessfulLogin(session, rememberMe);
        } else {
          this.loginError.set('Credenciales de Gerente incorrectas. Prueba: GER-101 / gerente123');
        }
      } else if (role === 'cajero') {
        if (employeeId.toUpperCase() === 'CAJ-201' && pin === '1234') {
          const SHIFT_HOURS_MS = 12 * 60 * 60 * 1000; // Turno de 12 horas
          const session: AuthSession = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.cajero_token_sample',
            role: 'cajero',
            user: { id: 'CAJ-201', name: 'Juan Pérez (Cajero de Caja #1)', employeeId: employeeId.toUpperCase() },
            expiresAt: Date.now() + SHIFT_HOURS_MS
          };
          this.handleSuccessfulLogin(session, rememberMe);
        } else {
          this.loginError.set('Credenciales de Cajero incorrectas. Prueba: CAJ-201 / PIN: 1234');
        }
      }
    }, 1000);
  }

  private handleSuccessfulLogin(session: AuthSession, rememberMe: boolean): void {
    this.successSession.set(session);
    console.log('Sesión iniciada con éxito:', session);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('auth_token', session.token);
    storage.setItem('user_role', session.role);
    storage.setItem('token_expires_at', session.expiresAt.toString());

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1500);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
