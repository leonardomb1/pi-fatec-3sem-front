import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LibUtilsModule } from "../../lib-utils/lib-utils.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    UserProfileComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LibUtilsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    PasswordModule,
    CardModule,
    ToastModule,
    PanelModule,
    InputMaskModule
  ],
  providers: [
    MessageService
  ]
})
export class UserModule { }
