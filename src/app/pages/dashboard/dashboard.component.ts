import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Programacion, Solicitud, ESTADOS_PROGRAMACION, ESTADOS_SOLICITUD } from '../../shared/models';
import { ProgramacionService } from '../programacion/services/programacion.service';
import { SolicitudService } from '../solicitud/services/solicitud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  programaciones: Programacion[] = [];
  solicitudes: Solicitud[] = [];
  cargando = true;

  constructor(
    private router: Router,
    private programacionService: ProgramacionService,
    private solicitudService: SolicitudService,
  ) {}

  ngOnInit(): void {
    this.programacionService.getAll().subscribe(progs => {
      this.programaciones = progs;
      this.solicitudService.getAll().subscribe(sols => {
        this.solicitudes = sols;
        this.cargando = false;
      });
    });
  }

  get totalProgramaciones(): number {
    return this.programaciones.length;
  }

  get programacionesPendientes(): number {
    return this.programaciones.filter(p => p.id_estado === 1).length;
  }

  get programacionesEnAprobacion(): number {
    return this.programaciones.filter(p => p.id_estado === 2 || p.id_estado === 3).length;
  }

  get programacionesAprobadas(): number {
    return this.programaciones.filter(p => p.id_estado === 5).length;
  }

  get totalSolicitudes(): number {
    return this.solicitudes.length;
  }

  get solicitudesPendientes(): number {
    return this.solicitudes.filter(s => s.id_estado === 1).length;
  }

  get solicitudesEnAprobacion(): number {
    return this.solicitudes.filter(s => s.id_estado === 2 || s.id_estado === 3).length;
  }

  irProgramaciones(): void {
    this.router.navigate(['/pages/programaciones']);
  }

  irSolicitudes(): void {
    this.router.navigate(['/pages/solicitudes']);
  }

  irUsuarios(): void {
    this.router.navigate(['/pages/usuarios']);
  }

  nuevaProgramacion(): void {
    this.router.navigate(['/pages/programaciones/crear']);
  }

}