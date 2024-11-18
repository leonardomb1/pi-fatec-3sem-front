import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { LibUtilsModule } from '../lib-utils/lib-utils.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, AppRoutingModule, BrowserModule, LibUtilsModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule { }
