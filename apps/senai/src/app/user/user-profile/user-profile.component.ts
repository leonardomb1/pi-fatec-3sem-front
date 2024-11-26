import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  private fb = inject(FormBuilder);

  registrationForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    motherName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    legalGuardianName: new FormControl(''),
    cep: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    educationLevel: new FormControl('', [Validators.required]),
    hasDisability: new FormControl(false),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  states: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  educationLevels: string[] = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-graduação', 'Mestrado', 'Doutorado'];

  ngOnInit() {
    // Simular o carregamento dos dados do usuário
    this.loadUserData();
  }

  loadUserData() {
    // Simular o carregamento dos dados do usuário
    // Na prática, você buscaria esses dados de um serviço
    const userData = {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 98765-4321',
      address: 'Rua das Flores, 123',
      birthDate: '1990-01-01'
    };

    // this.profileForm.patchValue(userData);
  }

  saveChanges() {
    // if (this.profileForm.valid) {
    //   console.log('Dados salvos:', this.profileForm.value);
    //   // Aqui você chamaria um serviço para salvar os dados no backend
    // }
  }
}
