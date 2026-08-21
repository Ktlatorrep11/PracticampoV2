
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type RolUsuario = 'docente' | 'coordinador' | 'asistente_decanatura' | 'decano' | null;

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private rolActual = new BehaviorSubject<RolUsuario>(null);
  rol$ = this.rolActual.asObservable();

  private nombreActual = new BehaviorSubject<string>('');
  nombre$ = this.nombreActual.asObservable();

  establecerRol(rol: RolUsuario, nombre: string): void {
    this.rolActual.next(rol);
    this.nombreActual.next(nombre);
  }

  getRol(): RolUsuario {
    return this.rolActual.value;
  }

  getNombre(): string {
    return this.nombreActual.value;
  }

  esDocente(): boolean {
    return this.getRol() === 'docente';
  }

  esCoordinador(): boolean {
    return this.getRol() === 'coordinador';
  }

  esAsistenteDecanatura(): boolean {
    return this.getRol() === 'asistente_decanatura';
  }

  esDecano(): boolean {
    return this.getRol() === 'decano';
  }

  cerrarSesion(): void {
    this.rolActual.next(null);
    this.nombreActual.next('');
  }

}