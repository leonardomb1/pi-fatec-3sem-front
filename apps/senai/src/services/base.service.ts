import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
 private apiUrl = new URL(`http://${environment.apiUrl}`);
 private http = inject(HttpClient);

 private getHeaders() {
   return new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${this.getToken()}`
   });
 }

 makeGet<T>(endpoint: string, params?: { [key: string]: string }, queryParams?: { [key: string]: string }): Observable<T> {
  let httpParams = new HttpParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
  }

  if (queryParams) {
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, queryParams[key]);
      }
    }
  }

  return this.http.get<T>(this.apiUrl + endpoint, { headers: this.getHeaders(), params: httpParams })
    .pipe(catchError(this.handleError));
}

makePost<T>(endpoint: string, body: any, queryParams?: { [key: string]: string }): Observable<T> {
  let httpParams = new HttpParams();

  if (queryParams) {
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, queryParams[key]);
      }
    }
  }

  return this.http.post<T>(this.apiUrl + endpoint, body, { headers: this.getHeaders(), params: httpParams })
    .pipe(catchError(this.handleError));
}

makePut<T>(endpoint: string, body: any, queryParams?: { [key: string]: string }): Observable<T> {
  let httpParams = new HttpParams();

  if (queryParams) {
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, queryParams[key]);
      }
    }
  }

  return this.http.put<T>(this.apiUrl + endpoint, body, { headers: this.getHeaders(), params: httpParams })
    .pipe(catchError(this.handleError));
}

makeDelete<T>(endpoint: string, params?: { [key: string]: string }, queryParams?: { [key: string]: string }): Observable<T> {
  let httpParams = new HttpParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
  }

  if (queryParams) {
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, queryParams[key]);
      }
    }
  }

  return this.http.delete<T>(this.apiUrl + endpoint, { headers: this.getHeaders(), params: httpParams })
    .pipe(catchError(this.handleError));
}

 private getToken(): string {
   return localStorage.getItem('auth_token') || '';
 }

 private handleError(error: HttpErrorResponse) {
   console.error('Erro na requisição:', error);

   switch(error.status) {
     case 400:
       return throwError(() => new Error('Requisição inválida'));
     case 404:
       return throwError(() => new Error('Recurso nao encontrado'));
     case 500:
       return throwError(() => new Error('Erro no servidor'));
     default:
       return throwError(() => new Error('Erro' || error.message));
   }
 }
}
