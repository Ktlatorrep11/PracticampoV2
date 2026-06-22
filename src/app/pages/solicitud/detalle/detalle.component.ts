import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Solicitud, ESTADOS_SOLICITUD } from '../../../shared/models';
import { SolicitudService } from '../services/solicitud.service';
import { DialogoRechazoComponent } from '../../programacion/dialogo-rechazo/dialogo-rechazo.component';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleSolicitudComponent implements OnInit {

  solicitud!: Solicitud;
  estados = ESTADOS_SOLICITUD;
  cargando = true;
  procesando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitudService: SolicitudService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitudService.getById(id).subscribe(data => {
      this.solicitud = data;
      this.cargando = false;
    });
  }

  getEstado(id: number): string {
    return this.estados[id] || 'Desconocido';
  }

  volver(): void {
    this.router.navigate(['/pages/solicitudes']);
  }

  enviarACoordinador(): void {
    this.procesando = true;
    this.solicitudService.enviarACoordinador(this.solicitud.id).subscribe(data => {
      this.solicitud = data;
      this.procesando = false;
    });
  }

  aprobarCoordinador(): void {
    this.procesando = true;
    this.solicitudService.aprobarCoordinador(this.solicitud.id).subscribe(data => {
      this.solicitud = data;
      this.procesando = false;
    });
  }

  rechazarCoordinador(): void {
    const dialogRef = this.dialog.open(DialogoRechazoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(observacion => {
      if (observacion) {
        this.procesando = true;
        this.solicitudService.rechazarCoordinador(this.solicitud.id, observacion).subscribe(data => {
          this.solicitud = data;
          this.procesando = false;
        });
      }
    });
  }

  aprobarDecano(): void {
    this.procesando = true;
    this.solicitudService.aprobarDecano(this.solicitud.id).subscribe(data => {
      this.solicitud = data;
      this.procesando = false;
    });
  }

  rechazarDecano(): void {
    const dialogRef = this.dialog.open(DialogoRechazoComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(observacion => {
      if (observacion) {
        this.procesando = true;
        this.solicitudService.rechazarDecano(this.solicitud.id, observacion).subscribe(data => {
          this.solicitud = data;
          this.procesando = false;
        });
      }
    });
  }

  cerrar(): void {
    this.procesando = true;
    this.solicitudService.cerrar(this.solicitud.id).subscribe(data => {
      this.solicitud = data;
      this.procesando = false;
    });
  }

}