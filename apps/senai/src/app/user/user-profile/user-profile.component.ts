import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'apps/senai/src/services/api.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  private destroyRef = inject(DestroyRef);
  private apiService = inject(ApiService);
  private messageService = inject(MessageService);
  private activatedRoute = inject(ActivatedRoute);

  registrationForm = new FormGroup({
    nomePessoa: new FormControl('', [Validators.required]),
    nomeUsuario: new FormControl('', [Validators.required]),
    dtNascimento: new FormControl(null as Date | null, [Validators.required]),
    cpf: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nomeMae: new FormControl({ value: '', disabled: true }, [Validators.required]),
    nomePai: new FormControl({ value: '', disabled: true }, [Validators.required]),
    nomeResponsavel: new FormControl(''),
    cep: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    nivelEscolaridade: new FormControl({ value: '', disabled: true }, [Validators.required]),
    pcd: new FormControl(false),
    descricaoPcd: new FormControl(''),
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

  id$ = this.activatedRoute.params.pipe(map(({ id }) => {
    this.id.next(Number(id));
    return Number(id);
  }));

  id = new BehaviorSubject(0);

  person$ = this.id$.pipe(
    switchMap((id) =>
      this.apiService.personService.find(id).pipe(
        map(({ message }) => message)
      )
    )
  )

  person = this.person$.pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe((person) => {
    if (person) this.registrationForm.patchValue(person);
  });

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

  saveChanges() {
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
            detail: 'Usuario atualizado realizado com sucesso'
          });
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
