import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from '../../../shared/models';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-listado-estudiantes',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoEstudiantesComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  cargando = true;
  idSolicitud: number = 0;

  documentos = [
    'seguro_estudiantil',
    'documento_identificacion',
    'certificado_eps',
    'permiso_acudiente',
    'vacuna_fiebre_amarilla',
    'vacuna_tetanos',
    'certificado_adicional_1',
    'certificado_adicional_2',
    'certificado_adicional_3',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estudianteService: EstudianteService,
  ) {}

  ngOnInit(): void {
    this.idSolicitud = Number(this.route.snapshot.paramMap.get('idSolicitud'));
    this.estudianteService.getBySolicitud(this.idSolicitud).subscribe(data => {
      this.estudiantes = data;
      this.cargando = false;
    });
  }

  getDocumentosCompletos(e: Estudiante): number {
    return this.documentos.filter(d => (e as any)[d]).length;
  }

  volver(): void {
    this.router.navigate(['/pages/solicitudes', this.idSolicitud]);
  }

  habilitar(e: Estudiante): void {
    this.estudianteService.habilitarEstudiante(e.num_identificacion, !e.habilitado)
      .subscribe(data => {
        const index = this.estudiantes.findIndex(est => est.num_identificacion === e.num_identificacion);
        if (index !== -1) this.estudiantes[index] = data;
      });
  }

}