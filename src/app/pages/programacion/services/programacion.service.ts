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

   crear(datos: any): Observable<Programacion> {
    if (environment.useMocks) {
      const nuevoId = Math.max(...this.programaciones.map(p => p.id), 0) + 1;
      const nuevaProgramacion: any = {
        ...datos,
        id: nuevoId,
        id_estado: 1,
        fecha_diligenciamiento: new Date().toISOString().split('T')[0],
      };
      this.programaciones.push(nuevaProgramacion);
      return of(nuevaProgramacion);
    }
    return this.http.post<Programacion>(`${this.apiUrl}/programaciones`, datos);
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
    return this.cambiarEstado(id, 5);
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

  iniciarEjecucion(id: number, requiereAvance: boolean, requiereTransporte: boolean): Observable<Programacion> {
    if (environment.useMocks) {
      const index = this.programaciones.findIndex(p => p.id === id);
      if (index !== -1) {
        this.programaciones[index] = {
          ...this.programaciones[index],
          id_estado: 7,
          requiere_avance: requiereAvance,
          requiere_transporte: requiereTransporte,
        };
        return of(this.programaciones[index]);
      }
    }
    return this.http.put<Programacion>(`${this.apiUrl}/programaciones/${id}/ejecucion`,
      { requiere_avance: requiereAvance, requiere_transporte: requiereTransporte });
  }

  entregarInforme(id: number, informe: string, fechaReal: string): Observable<Programacion> {
    if (environment.useMocks) {
      const index = this.programaciones.findIndex(p => p.id === id);
      if (index !== -1) {
        this.programaciones[index] = {
          ...this.programaciones[index],
          id_estado: 8,
          informe_actividades: informe,
          fecha_ejecucion_real: fechaReal,
        };
        return of(this.programaciones[index]);
      }
    }
    return this.http.put<Programacion>(`${this.apiUrl}/programaciones/${id}/informe`,
      { informe_actividades: informe, fecha_ejecucion_real: fechaReal });
  }

  aprobarInformeCoordinador(id: number): Observable<Programacion> {
    return this.cambiarEstado(id, 9);
  }

  legalizar(id: number): Observable<Programacion> {
    return this.cambiarEstado(id, 10);
  }

}