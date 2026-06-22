import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Estudiante } from '../../../shared/models';
import { MOCK_ESTUDIANTES } from '../../../shared/mocks';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private apiUrl = environment.CONF_MENU_SERVICE;
  private estudiantes: Estudiante[] = [...MOCK_ESTUDIANTES];

  constructor(private http: HttpClient) {}

  getBySolicitud(idSolicitud: number): Observable<Estudiante[]> {
    if (environment.useMocks) {
      return of(this.estudiantes.filter(e => e.id_solicitud_practica === idSolicitud));
    }
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiantes?solicitud=${idSolicitud}`);
  }

  getByIdentificacion(numIdentificacion: string): Observable<Estudiante> {
    if (environment.useMocks) {
      const e = this.estudiantes.find(e => e.num_identificacion === numIdentificacion);
      return of(e!);
    }
    return this.http.get<Estudiante>(`${this.apiUrl}/estudiantes/${numIdentificacion}`);
  }

  actualizarDocumento(numIdentificacion: string, campo: string, valor: string): Observable<Estudiante> {
    if (environment.useMocks) {
      const index = this.estudiantes.findIndex(e => e.num_identificacion === numIdentificacion);
      if (index !== -1) {
        this.estudiantes[index] = { ...this.estudiantes[index], [campo]: valor };
        return of(this.estudiantes[index]);
      }
    }
    return this.http.patch<Estudiante>(`${this.apiUrl}/estudiantes/${numIdentificacion}`, { [campo]: valor });
  }

  habilitarEstudiante(numIdentificacion: string, habilitado: boolean): Observable<Estudiante> {
    if (environment.useMocks) {
      const index = this.estudiantes.findIndex(e => e.num_identificacion === numIdentificacion);
      if (index !== -1) {
        this.estudiantes[index] = { ...this.estudiantes[index], habilitado };
        return of(this.estudiantes[index]);
      }
    }
    return this.http.patch<Estudiante>(`${this.apiUrl}/estudiantes/${numIdentificacion}`, { habilitado });
  }

}