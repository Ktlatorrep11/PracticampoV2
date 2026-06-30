import { Component, OnInit } from '@angular/core';
import { Presupuesto, Programacion } from '../../../shared/models';
import { PresupuestoService } from '../services/presupuesto.service';
import { ProgramacionService } from '../../programacion/services/programacion.service';

interface PresupuestoConProgramacion extends Presupuesto {
  programacion?: Programacion;
}

@Component({
  selector: 'app-listado-presupuesto',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoPresupuestoComponent implements OnInit {

  presupuestos: PresupuestoConProgramacion[] = [];
  cargando = true;

  constructor(
    private presupuestoService: PresupuestoService,
    private programacionService: ProgramacionService,
  ) {}

  ngOnInit(): void {
    this.presupuestoService.getAll().subscribe(presupuestos => {
      this.programacionService.getAll().subscribe(programaciones => {
        this.presupuestos = presupuestos.map(p => ({
          ...p,
          programacion: programaciones.find(prog => prog.id === p.id_programacion_practica)
        }));
        this.cargando = false;
      });
    });
  }

  get totalAsignado(): number {
    return this.presupuestos.reduce((sum, p) => sum + p.valor_total_asignado, 0);
  }

  get totalEjecutado(): number {
    return this.presupuestos.reduce((sum, p) => sum + p.valor_total_ejecutado, 0);
  }

  get porcentajeEjecucion(): number {
    if (this.totalAsignado === 0) return 0;
    return Math.round((this.totalEjecutado / this.totalAsignado) * 100);
  }

  getPorcentajeFila(p: PresupuestoConProgramacion): number {
    if (p.valor_total_asignado === 0) return 0;
    return Math.round((p.valor_total_ejecutado / p.valor_total_asignado) * 100);
  }

}