import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OatiSGAService, EstudianteSGA } from '../../../shared/services/oati-sga.service';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-inscripcion-estudiante',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionEstudianteComponent implements OnInit {

  form!: FormGroup;
  idSolicitud: number = 0;
  estudianteSGA: EstudianteSGA | null = null;
  buscando = false;
  noEncontrado = false;
  sinMatricula = false;
  guardando = false;

  grupos = ['01', '02', '03', '04'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sgaService: OatiSGAService,
    private estudianteService: EstudianteService,
  ) {}

  ngOnInit(): void {
    this.idSolicitud = Number(this.route.snapshot.paramMap.get('idSolicitud'));
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      grupo:  ['01', Validators.required],
      celular: [''],
      eps:    ['', Validators.required],
    });
  }

  buscarEnSGA(): void {
    const codigo = this.form.get('codigo')?.value;
    if (!codigo) return;

    this.buscando = true;
    this.noEncontrado = false;
    this.sinMatricula = false;
    this.estudianteSGA = null;

    this.sgaService.getEstudiante(codigo).subscribe(datos => {
      this.buscando = false;
      if (!datos) {
        this.noEncontrado = true;
      } else if (!datos.matricula_activa) {
        this.sinMatricula = true;
      } else {
        this.estudianteSGA = datos;
      }
    });
  }

  guardar(): void {
    if (this.form.valid && this.estudianteSGA) {
      this.guardando = true;
      const estudiante = {
        num_identificacion: this.estudianteSGA.num_identificacion,
        nombre_completo: this.estudianteSGA.nombre_completo,
        email: this.estudianteSGA.email,
        grupo: this.form.get('grupo')?.value,
        celular: this.form.get('celular')?.value,
        eps: this.form.get('eps')?.value,
        id_solicitud_practica: this.idSolicitud,
        seguro_estudiantil: '',
        documento_identificacion: '',
        certificado_eps: '',
        permiso_acudiente: '',
        vacuna_fiebre_amarilla: '',
        vacuna_tetanos: '',
        certificado_adicional_1: '',
        certificado_adicional_2: '',
        certificado_adicional_3: '',
        detalle_certificado_adicional_1: '',
        detalle_certificado_adicional_2: '',
        detalle_certificado_adicional_3: '',
        habilitado: false,
      };
      console.log('Inscribiendo estudiante:', estudiante);
      this.router.navigate(['/pages/estudiantes', this.idSolicitud]);
    }
  }

  cancelar(): void {
    this.router.navigate(['/pages/estudiantes', this.idSolicitud]);
  }

}