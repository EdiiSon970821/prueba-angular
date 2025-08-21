import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );;
  }

  public getById(idProyecto: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${idProyecto}`).pipe(
      catchError(this.handleError)
    );
  }

  public create(obj: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, obj).pipe(
      catchError(this.handleError)
    );;
  }

  public update(idProyecto: string, obj: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${idProyecto}`, obj).pipe(
      catchError(this.handleError)
    );;
  }

  public delete(idProyecto: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${idProyecto}`).pipe(
      catchError(this.handleError)
    );;
  }

  private handleError() {
    let mensajeError = 'Ocurrio un error inesperado';

    console.error(mensajeError);

    return throwError(() => mensajeError);
  }

}
