import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Programacion, ESTADOS_PROGRAMACION } from '../../../shared/models';
import { ProgramacionService } from '../services/programacion.service';
import { PresupuestoService } from '../../presupuesto/services/presupuesto.service';
import { DialogoRechazoComponent } from '../dialogo-rechazo/dialogo-rechazo.component';
import { DialogoPresupuestoComponent } from '../dialogo-presupuesto/dialogo-presupuesto.component';
import { DialogoEjecucionComponent } from '../dialogo-ejecucion/dialogo-ejecucion.component';

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
  
  imprimir(): void {
    window.print();
  }

  enviarACoordinador(): void {
    if (!confirm('¿Confirmas enviar esta programación al Coordinador para revisión?')) return;
    this.procesando = true;
    this.programacionService.enviarACoordinador(this.programacion.id).subscribe({
      next: data => { this.programacion = data; this.procesando = false; },
      error: () => { this.procesando = false; alert('Ocurrió un error al enviar la programación. Intenta de nuevo.'); }
    });
  }

  aprobarCoordinador(): void {
    if (!confirm('¿Confirmas la aprobación de esta programación como Coordinador?')) return;
    this.procesando = true;
    this.programacionService.aprobarCoordinador(this.programacion.id).subscribe({
      next: data => { this.programacion = data; this.procesando = false; },
      error: () => { this.procesando = false; alert('Ocurrió un error al aprobar. Intenta de nuevo.'); }
    });
  }

  rechazarCoordinador(): void {
    const dialogRef = this.dialog.open(DialogoRechazoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(observacion => {
      if (observacion) {
        this.procesando = true;
        this.programacionService.rechazarCoordinador(this.programacion.id, observacion).subscribe({
          next: data => { this.programacion = data; this.procesando = false; },
          error: () => { this.procesando = false; alert('Ocurrió un error al rechazar. Intenta de nuevo.'); }
        });
      }
    });
  }

   aprobarDecano(): void {
    const dialogRef = this.dialog.open(DialogoPresupuestoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(valor => {
      if (valor) {
        if (!confirm('¿Confirmas el visto bueno como Decano con el presupuesto asignado?')) return;
        this.procesando = true;
        this.presupuestoService.asignarPresupuesto(
          this.programacion.id,
          this.programacion.id_programa_academico,
          valor
        ).subscribe({
          next: () => {
            this.programacionService.aprobarDecano(this.programacion.id).subscribe({
              next: data => { this.programacion = data; this.procesando = false; },
              error: () => { this.procesando = false; alert('Ocurrió un error al aprobar. Intenta de nuevo.'); }
            });
          },
          error: () => { this.procesando = false; alert('Ocurrió un error al asignar el presupuesto. Intenta de nuevo.'); }
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

  iniciarEjecucion(): void {
    const dialogRef = this.dialog.open(DialogoEjecucionComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado !== null && resultado !== undefined) {
        this.procesando = true;
        this.programacionService.iniciarEjecucion(
          this.programacion.id,
          resultado.requiereAvance,
          resultado.requiereTransporte
        ).subscribe(data => {
          this.programacion = data;
          this.procesando = false;
        });
      }
    });
  }

  entregarInforme(): void {
    this.procesando = true;
    this.programacionService.entregarInforme(
      this.programacion.id,
      'Informe de actividades de la práctica de campo',
      new Date().toISOString().split('T')[0]
    ).subscribe(data => {
      this.programacion = data;
      this.procesando = false;
    });
  }

  aprobarInformeCoordinador(): void {
    this.procesando = true;
    this.programacionService.aprobarInformeCoordinador(this.programacion.id).subscribe(data => {
      this.programacion = data;
      this.procesando = false;
    });
  }

  legalizar(): void {
    if (!confirm('¿Confirmas la legalización de esta práctica? Esta acción es definitiva y cierra el proceso.')) return;
    this.procesando = true;
    this.programacionService.legalizar(this.programacion.id).subscribe({
      next: data => { this.programacion = data; this.procesando = false; },
      error: () => { this.procesando = false; alert('Ocurrió un error al legalizar. Intenta de nuevo.'); }
    });
  }
  }