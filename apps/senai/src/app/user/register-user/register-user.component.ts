import { MessageService } from 'primeng/api';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'apps/senai/src/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent implements OnInit{
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private apiService = inject(ApiService);
  private messageService = inject(MessageService);

  registrationForm = new FormGroup({
    nomePessoa: new FormControl('', [Validators.required]),
    nomeUsuario: new FormControl('', [Validators.required]),
    dtNascimento: new FormControl(null as Date | null, [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nomeMae: new FormControl('', [Validators.required]),
    nomePai: new FormControl('', [Validators.required]),
    nomeResponsavel: new FormControl(''),
    cep: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    nivelEscolaridade: new FormControl('', [Validators.required]),
    pcd: new FormControl(false),
    descricaoPcd: new FormControl(''),
    senha: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required]),
    agreeTerms: new FormControl(false, [Validators.requiredTrue]),
    banco: new FormControl(''),
    agencia: new FormControl(''),
    candidato: new FormControl(true)
  });

  legalAge = signal(true)

  states: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  nivelEscolaridades: string[] = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-graduação', 'Mestrado', 'Doutorado'];
  locale = {
    firstDayOfWeek: 0,
    dayNames: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
    dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
    monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    today: "Hoje",
    clear: "Limpar"
  };

  ngOnInit(): void {
    this.getBirthDateValue();
  }

  getBirthDateValue(): void {
    this.registrationForm.get('dtNascimento')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(value => {
      const today = new Date();

      if (value && (today.getFullYear() - value!.getFullYear() >= 18)) {
        this.legalAge.set(true);
        this.registrationForm.get('nomeResponsavel')?.clearValidators();
      } else {
        this.legalAge.set(false);
        this.registrationForm.get('nomeResponsavel')?.setValidators([Validators.required]);
      }
    })
  }

  getPcd(): void {
    this.registrationForm.get('pcd')?.valueChanges.
    pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      if (value) {
        this.registrationForm.get('descricaoPcd')?.setValidators([Validators.required]);
      } else {
        this.registrationForm.get('descricaoPcd')?.clearValidators();
      }
    })
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  onSubmit() {
    console.log(this.registrationForm);
    if (this.registrationForm.valid) {
      const data = {
        ...this.registrationForm.value,
        usuario: {
          ...this.registrationForm.value
        }
      }

      this.apiService.personService.create(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cadastro realizado com sucesso'
          });
          this.router.navigate(['../../login']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message
          })
        }
      })
    }
  }
}
