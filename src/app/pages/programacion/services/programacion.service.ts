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

  constructor(private http: HttpClient) {}

  getAll(): Observable<Programacion[]> {
    if (environment.useMocks) {
      return of(MOCK_PROGRAMACIONES);
    }
    return this.http.get<Programacion[]>(`${this.apiUrl}/programaciones`);
  }

  getById(id: number): Observable<Programacion> {
    if (environment.useMocks) {
      const prog = MOCK_PROGRAMACIONES.find(p => p.id === id);
      return of(prog!);
    }
    return this.http.get<Programacion>(`${this.apiUrl}/programaciones/${id}`);
  }

}