import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Programacion } from '../../../shared/models';
import { MOCK_PROGRAMACIONES } from '../../../shared/mocks';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService {

  private apiUrl = environment.CONF_MENU_SERVICE;
  private programaciones: Programacion[] = [...MOCK_PROGRAMACIONES];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Programacion[]> {
    if (environment.useMocks) {
      return of(this.programaciones);
    }
    return this.http.get<Programacion[]>(`${this.apiUrl}/programaciones`);
  }

  getById(id: number): Observable<Programacion> {
    if (environment.useMocks) {
      const prog = this.programaciones.find(p => p.id === id);
      return of(prog!);
    }
    return this.http.get<Programacion>(`${this.apiUrl}/programaciones/${id}`);
  }

  cambiarEstado(id: number, nuevoEstado: number, observacion: string = ''): Observable<Programacion> {
    if (environment.useMocks) {
      const index = this.programaciones.findIndex(p => p.id === id);
      if (index !== -1) {
        this.programaciones[index] = {
          ...this.programaciones[index],
          id_estado: nuevoEstado,
          observacion_rechazo: observacion || undefined,
        };
        return of(this.programaciones[index]);
      }
    }
    return this.http.put<Programacion>(`${this.apiUrl}/programaciones/${id}/estado`,
      { id_estado: nuevoEstado, observacion_rechazo: observacion });
  }

  enviarACoordinador(id: number): Observable<Programacion> {
    return this.cambiarEstado(id, 2);
  }

  aprobarCoordinador(id: number): Observable<Programacion> {
    return this.cambiarEstado(id, 3);
  }

  rechazarCoordinador(id: number, observacion: string = ''): Observable<Programacion> {
    return this.cambiarEstado(id, 4, observacion);
  }

  aprobarDecano(id: number): Observable<Programacion> {
    return this.cambiarEstado(id, 5);
  }

  rechazarDecano(id: number, observacion: string = ''): Observable<Programacion> {
    return this.cambiarEstado(id, 6, observacion);
  }

}