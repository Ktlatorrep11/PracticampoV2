
import { Injectable } from '@angular/core';

export interface RegistroAuditoria {
  id: number;
  entidad: 'programacion' | 'solicitud';
  idEntidad: number;
  accion: string;
  observacion?: string;
  usuario: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private registros: RegistroAuditoria[] = [];
  private contador = 1;

  registrar(entidad: 'programacion' | 'solicitud', idEntidad: number, accion: string, observacion?: string): void {
    this.registros.push({
      id: this.contador++,
      entidad,
      idEntidad,
      accion,
      observacion,
      usuario: 'Usuario actual', // se reemplaza por el usuario autenticado cuando esté disponible
      fecha: new Date().toLocaleString('es-CO'),
    });
  }

  getHistorial(entidad: 'programacion' | 'solicitud', idEntidad: number): RegistroAuditoria[] {
    return this.registros
      .filter(r => r.entidad === entidad && r.idEntidad === idEntidad)
      .sort((a, b) => b.id - a.id);
  }

}