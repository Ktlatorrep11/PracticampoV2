import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Programacion, ESTADOS_PROGRAMACION } from '../../../shared/models';
import { ProgramacionService } from '../services/programacion.service';
import { PresupuestoService } from '../../presupuesto/services/presupuesto.service';
import { DialogoRechazoComponent } from '../dialogo-rechazo/dialogo-rechazo.component';
import { DialogoPresupuestoComponent } from '../dialogo-presupuesto/dialogo-presupuesto.component';

@Component({
  selector: 'app-detalle-programacion',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  programacion!: Programacion;
  estados = ESTADOS_PROGRAMACION;
  cargando = true;
  procesando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programacionService: ProgramacionService,
    private presupuestoService: PresupuestoService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.programacionService.getById(id).subscribe(data => {
      this.programacion = data;
      this.cargando = false;
    });
  }

  getEstado(id: number): string {
    return this.estados[id] || 'Desconocido';
  }

  volver(): void {
    this.router.navigate(['/pages/programaciones']);
  }

  enviarACoordinador(): void {
    this.procesando = true;
    this.programacionService.enviarACoordinador(this.programacion.id).subscribe(data => {
      this.programacion = data;
      this.procesando = false;
    });
  }

  aprobarCoordinador(): void {
    this.procesando = true;
    this.programacionService.aprobarCoordinador(this.programacion.id).subscribe(data => {
      this.programacion = data;
      this.procesando = false;
    });
  }

  rechazarCoordinador(): void {
    const dialogRef = this.dialog.open(DialogoRechazoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(observacion => {
      if (observacion) {
        this.procesando = true;
        this.programacionService.rechazarCoordinador(this.programacion.id, observacion).subscribe(data => {
          this.programacion = data;
          this.procesando = false;
        });
      }
    });
  }

  aprobarDecano(): void {
    const dialogRef = this.dialog.open(DialogoPresupuestoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(valor => {
      if (valor) {
        this.procesando = true;
        this.presupuestoService.asignarPresupuesto(
          this.programacion.id,
          this.programacion.id_programa_academico,
          valor
        ).subscribe(() => {
          this.programacionService.aprobarDecano(this.programacion.id).subscribe(data => {
            this.programacion = data;
            this.procesando = false;
          });
        });
      }
    });
  }

  rechazarDecano(): void {
    const dialogRef = this.dialog.open(DialogoRechazoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(observacion => {
      if (observacion) {
        this.procesando = true;
        this.programacionService.rechazarDecano(this.programacion.id, observacion).subscribe(data => {
          this.programacion = data;
          this.procesando = false;
        });
      }
    });
  }

}