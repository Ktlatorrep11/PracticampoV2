import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud, ESTADOS_SOLICITUD } from '../../../shared/models';
import { SolicitudService } from '../services/solicitud.service';

@Component({
  selector: 'app-listado-solicitud',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoSolicitudComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  estados = ESTADOS_SOLICITUD;
  cargando = true;

  constructor(
    private solicitudService: SolicitudService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.solicitudService.getAll().subscribe(data => {
      this.solicitudes = data;
      this.cargando = false;
    });
  }

  getEstado(id: number): string {
    return this.estados[id] || 'Desconocido';
  }

  nueva(): void {
    this.router.navigate(['/pages/solicitudes/crear']);
  }

  verDetalle(id: number): void {
    this.router.navigate(['/pages/solicitudes', id]);
  }

}