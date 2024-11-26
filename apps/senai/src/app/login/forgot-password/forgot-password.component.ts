import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log('Password reset requested for:', this.forgotPasswordForm.value.email);
      // Aqui você implementaria a lógica para enviar o e-mail de recuperação
      this.router.navigate(['../reset-password'], {
        relativeTo: this.activatedRoute
      });
    }
  }
}
