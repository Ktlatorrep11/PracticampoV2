import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Solicitud } from '../../../shared/models';
import { MOCK_SOLICITUDES } from '../../../shared/mocks';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = environment.CONF_MENU_SERVICE;
  private solicitudes: Solicitud[] = [...MOCK_SOLICITUDES];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Solicitud[]> {
    if (environment.useMocks) {
      return of(this.solicitudes);
    }
    return this.http.get<Solicitud[]>(`${this.apiUrl}/solicitudes`);
  }

  getById(id: number): Observable<Solicitud> {
    if (environment.useMocks) {
      const sol = this.solicitudes.find(s => s.id === id);
      return of(sol!);
    }
    return this.http.get<Solicitud>(`${this.apiUrl}/solicitudes/${id}`);
  }

  crear(datos: any): Observable<Solicitud> {
    if (environment.useMocks) {
      const nuevoId = Math.max(...this.solicitudes.map(s => s.id), 0) + 1;
      const nuevaSolicitud: any = {
        ...datos,
        id: nuevoId,
        id_estado: 1,
        fecha_diligenciamiento: new Date().toISOString().split('T')[0],
      };
      this.solicitudes.push(nuevaSolicitud);
      return of(nuevaSolicitud);
    }
    return this.http.post<Solicitud>(`${this.apiUrl}/solicitudes`, datos);
  }

  cambiarEstado(id: number, nuevoEstado: number, observacion: string = ''): Observable<Solicitud> {
    if (environment.useMocks) {
      const index = this.solicitudes.findIndex(s => s.id === id);
      if (index !== -1) {
        this.solicitudes[index] = {
          ...this.solicitudes[index],
          id_estado: nuevoEstado,
        };
        return of(this.solicitudes[index]);
      }
    }
    return this.http.put<Solicitud>(`${this.apiUrl}/solicitudes/${id}/estado`,
      { id_estado: nuevoEstado, observacion_rechazo: observacion });
  }

  enviarACoordinador(id: number): Observable<Solicitud> {
    return this.cambiarEstado(id, 2);
  }

  aprobarCoordinador(id: number): Observable<Solicitud> {
    return this.cambiarEstado(id, 3);
  }

  rechazarCoordinador(id: number, observacion: string = ''): Observable<Solicitud> {
    return this.cambiarEstado(id, 4, observacion);
  }

  aprobarDecano(id: number): Observable<Solicitud> {
    return this.cambiarEstado(id, 5);
  }

  rechazarDecano(id: number, observacion: string = ''): Observable<Solicitud> {
    return this.cambiarEstado(id, 6, observacion);
  }

  cerrar(id: number): Observable<Solicitud> {
    return this.cambiarEstado(id, 8);
  }

  importarEstudiantesPorDocumento(idSolicitud: number, documentos: (string | number)[]): Observable<any> {
    if (environment.useMocks) {
      // SIMULACIÓN — la integración real consulta el SGA por cada documento
      // y trae nombre, código, correo y programa académico automáticamente.
      console.log(`Simulando importación de ${documentos.length} estudiantes para la solicitud ${idSolicitud}:`, documentos);
      return of({ inscritos: documentos.length, exitoso: true });
    }
    return this.http.post(`${this.apiUrl}/solicitudes/${idSolicitud}/importar-estudiantes`,
      { documentos });
  }

}
