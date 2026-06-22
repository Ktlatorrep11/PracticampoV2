import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Usuario } from '../../../shared/models';
import { MOCK_USUARIOS } from '../../../shared/mocks';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.CONF_MENU_SERVICE;
  private usuarios: Usuario[] = [...MOCK_USUARIOS];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    if (environment.useMocks) {
      return of(this.usuarios);
    }
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  getById(id: number): Observable<Usuario> {
    if (environment.useMocks) {
      const u = this.usuarios.find(u => u.id === id);
      return of(u!);
    }
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  getDocentes(): Observable<Usuario[]> {
    if (environment.useMocks) {
      return of(this.usuarios.filter(u => u.id_role === 2 || u.id_role === 7));
    }
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios?rol=docente`);
  }

  crear(usuario: Partial<Usuario>): Observable<Usuario> {
    if (environment.useMocks) {
      const nuevo = { ...usuario, id: this.usuarios.length + 1, id_estado: 1 } as Usuario;
      this.usuarios.push(nuevo);
      return of(nuevo);
    }
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }

  actualizar(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    if (environment.useMocks) {
      const index = this.usuarios.findIndex(u => u.id === id);
      if (index !== -1) {
        this.usuarios[index] = { ...this.usuarios[index], ...usuario };
        return of(this.usuarios[index]);
      }
    }
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  cambiarEstado(id: number, estado: number): Observable<Usuario> {
    return this.actualizar(id, { id_estado: estado });
  }

}