import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  resetPasswordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validator: this.passwordMatchValidator })

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      console.log('Password reset:', this.resetPasswordForm.value.newPassword);
      // Aqui você implementaria a lógica para redefinir a senha
      this.router.navigate(['/login']);
    }
  }
}
