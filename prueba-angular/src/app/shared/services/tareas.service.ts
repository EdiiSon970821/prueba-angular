import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );;
  }

  public getById(idTarea: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${idTarea}`).pipe(
      catchError(this.handleError)
    );;
  }

  public create(obj: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, obj).pipe(
      catchError(this.handleError)
    );;
  }

  public update(tareaId: string, obj: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${tareaId}`, obj).pipe(
      catchError(this.handleError)
    );;
  }

  public delete(idTarea: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${idTarea}`).pipe(
      catchError(this.handleError)
    );;
  }

  public getTareasByIdProyecto(idProyecto: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}?userId=${idProyecto}`).pipe(
      catchError(this.handleError)
    );;
  }

  private handleError() {
      let mensajeError = 'Ocurrio un error inesperado';
  
      console.error(mensajeError);
  
      return throwError(() => mensajeError);
    }

}
