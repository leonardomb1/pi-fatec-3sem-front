import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent implements OnInit{
  private destroyRef = inject(DestroyRef)

  registrationForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null as Date | null, [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    motherName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    legalGuardianName: new FormControl(''),
    cep: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    educationLevel: new FormControl('', [Validators.required]),
    hasDisability: new FormControl(false),
    descricaoPcd: new FormControl(''),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required]),
    agreeTerms: new FormControl(false, [Validators.requiredTrue])
  });

  legalAge = signal(true)

  states: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  educationLevels: string[] = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-graduação', 'Mestrado', 'Doutorado'];

  ngOnInit(): void {
    this.getBirthDateValue();
  }

  getBirthDateValue(): void {
    this.registrationForm.get('birthDate')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(value => {
      const today = new Date();

      if (value &&
        value.getDay() <= today.getDay() &&
        value.getMonth() <= today.getMonth() &&
        (value.getFullYear() - today.getFullYear() >= 18)
      ) {
        this.legalAge.set(true);
        this.registrationForm.get('legalGuardianName')?.clearValidators();
      } else {
        this.legalAge.set(false);
        this.registrationForm.get('legalGuardianName')?.setValidators([Validators.required]);
      }
    })
  }

  getHasDisability(): void {
    this.registrationForm
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      // Here you would typically send the form data to your backend
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
