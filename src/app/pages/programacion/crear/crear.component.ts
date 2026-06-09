import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-programacion',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  form!: FormGroup;
  paso = 1;
  totalPasos = 7;

  cantidadGrupos = [1, 2, 3, 4];
  tiposVinculacion = [
    { id: 1, nombre: 'Docente de planta' },
    { id: 2, nombre: 'Docente especial' },
    { id: 3, nombre: 'Docente ocasional' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Paso 1 — Datos básicos
      id_espacio_academico:     [null, Validators.required],
      id_programa_academico:    [null, Validators.required],
      anio_periodo:             ['', Validators.required],
      id_semestre_asignatura:   [null, Validators.required],
      cantidad_grupos:          [1, Validators.required],
      grupo_1:                  ['', Validators.required],
      grupo_2:                  [''],
      grupo_3:                  [''],
      grupo_4:                  [''],
      num_estudiantes_aprox:    [null, [Validators.required, Validators.min(1)]],
      id_tipo_vinculacion:      [null, Validators.required],
      // Paso 2 — Ruta principal
      destino_rp:               ['', Validators.required],
      lugar_salida_rp:          ['', Validators.required],
      lugar_regreso_rp:         ['', Validators.required],
      fecha_salida_aprox_rp:    ['', Validators.required],
      fecha_regreso_aprox_rp:   ['', Validators.required],
      duracion_num_dias_rp:     [null, [Validators.required, Validators.min(1)]],
      ruta_principal:           [''],
      // Paso 3 — Ruta alterna
      destino_ra:               [''],
      fecha_salida_aprox_ra:    [''],
      fecha_regreso_aprox_ra:   [''],
      duracion_num_dias_ra:     [null],
      ruta_alterna:             [''],
      // Paso 4 — Docentes
      id_docente_responsable:   [null, Validators.required],
      id_docente_apoyo:         [null],
      // Paso 5 — Materiales (se manejan aparte)
      // Paso 6 — Riesgos (se manejan aparte)
      // Paso 7 — Presupuesto (se maneja aparte)
    });
  }

  get esVinculacionEspecial(): boolean {
    return this.form.get('id_tipo_vinculacion')?.value === 2;
  }

  siguiente(): void {
    if (this.paso < this.totalPasos) this.paso++;
  }

  anterior(): void {
    if (this.paso > 1) this.paso--;
  }

  guardar(): void {
    if (this.form.valid) {
      console.log('Formulario:', this.form.value);
      this.router.navigate(['/pages/programaciones']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/pages/programaciones']);
  }

}