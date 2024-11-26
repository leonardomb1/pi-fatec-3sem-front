import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { LibUtilsModule } from '../lib-utils/lib-utils.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    LibUtilsModule,
    BrowserAnimationsModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }
