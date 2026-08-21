import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Programacion } from '../../../shared/models';
import { ProgramacionService } from '../../programacion/services/programacion.service';
import { SolicitudService } from '../services/solicitud.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearSolicitudComponent implements OnInit {

  form!: FormGroup;
  programaciones: Programacion[] = [];
  cargando = true;

  tiposRuta = [
    { id: 1, nombre: 'Ruta principal' },
    { id: 2, nombre: 'Ruta alterna' },
  ];

   constructor(
    private fb: FormBuilder,
    private router: Router,
    private programacionService: ProgramacionService,
    private solicitudService: SolicitudService,
  ) {}
  
  ngOnInit(): void {
    this.programacionService.getAll().subscribe(data => {
      this.programaciones = data.filter(p => p.id_estado === 5);
      this.cargando = false;
    });

    this.form = this.fb.group({
      id_programacion_practica: [null, Validators.required],
      id_tipo_ruta:             [1, Validators.required],
      consec_dfamarena:         [''],
      consec_cordis:            [''],
      fecha_salida_real:        [''],
      fecha_regreso_real:       [''],
 observaciones:            [''],
      doc_seguro_estudiantil:   [true],
      doc_identificacion:       [true],
      doc_eps:                  [true],
      doc_permiso_acudiente:    [false],
      doc_vacuna_fiebre_amarilla: [false],
      doc_vacuna_tetanos:       [false],
      doc_certificado_natacion: [false],
    });

  }

  guardar(): void {
    if (this.form.valid) {
      if (!confirm('¿Confirmas guardar esta solicitud?')) return;
      this.solicitudService.crear(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/pages/solicitudes']);
        },
        error: () => {
          alert('Ocurrió un error al guardar la solicitud. Por favor intenta de nuevo.');
        }
      });
    } else {
      this.form.markAllAsTouched();
      alert('Faltan campos obligatorios por completar. Revisa el formulario antes de guardar.');
    }
  }

  cancelar(): void {
    this.router.navigate(['/pages/solicitudes']);
  }

}