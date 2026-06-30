import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Presupuesto, ViaticoCalculado } from '../../../shared/models';
import { MOCK_PRESUPUESTOS } from '../../../shared/mocks';

// Parámetros de viáticos según el sistema (configurables por admin)
const VALOR_VIATICO_DOCENTE_DIA = 120000;
const VALOR_VIATICO_ESTUDIANTE_DIA = 65000;

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  private apiUrl = environment.CONF_MENU_SERVICE;
  private presupuestos: Presupuesto[] = [...MOCK_PRESUPUESTOS];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Presupuesto[]> {
    if (environment.useMocks) {
      return of(this.presupuestos);
    }
    return this.http.get<Presupuesto[]>(`${this.apiUrl}/presupuestos`);
  }

  getByProgramacion(idProgramacion: number): Observable<Presupuesto | null> {
    if (environment.useMocks) {
      const p = this.presupuestos.find(p => p.id_programacion_practica === idProgramacion);
      return of(p || null);
    }
    return this.http.get<Presupuesto>(`${this.apiUrl}/presupuestos?programacion=${idProgramacion}`);
  }

  calcularViaticoDocente(idProgramacion: number, numDias: number, numDocentes: number): ViaticoCalculado {
    return {
      id_programacion_practica: idProgramacion,
      num_dias: numDias,
      num_personas: numDocentes,
      valor_dia_persona: VALOR_VIATICO_DOCENTE_DIA,
      valor_total: numDias * numDocentes * VALOR_VIATICO_DOCENTE_DIA,
      tipo: 'docente',
    };
  }

  calcularViaticoEstudiante(idProgramacion: number, numDias: number, numEstudiantes: number): ViaticoCalculado {
    return {
      id_programacion_practica: idProgramacion,
      num_dias: numDias,
      num_personas: numEstudiantes,
      valor_dia_persona: VALOR_VIATICO_ESTUDIANTE_DIA,
      valor_total: numDias * numEstudiantes * VALOR_VIATICO_ESTUDIANTE_DIA,
      tipo: 'estudiante',
    };
  }

  asignarPresupuesto(idProgramacion: number, idProgramaAcademico: number, valor: number): Observable<Presupuesto> {
    if (environment.useMocks) {
      const nuevo: Presupuesto = {
        id: this.presupuestos.length + 1,
        id_programacion_practica: idProgramacion,
        id_programa_academico: idProgramaAcademico,
        valor_total_asignado: valor,
        valor_total_ejecutado: 0,
        anio: '2026',
      };
      this.presupuestos.push(nuevo);
      return of(nuevo);
    }
    return this.http.post<Presupuesto>(`${this.apiUrl}/presupuestos`, {
      id_programacion_practica: idProgramacion,
      id_programa_academico: idProgramaAcademico,
      valor_total_asignado: valor,
    });
  }

}