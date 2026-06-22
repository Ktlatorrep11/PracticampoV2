import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../shared/models';
import { UsuarioService } from '../../usuarios/services/usuario.service';

@Component({
  selector: 'app-crear-programacion',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  form!: FormGroup;
  paso = 1;
  totalPasos = 7;
  docentes: Usuario[] = [];

  cantidadGrupos = [1, 2, 3, 4];
  tiposVinculacion = [
    { id: 1, nombre: 'Docente de planta' },
    { id: 2, nombre: 'Docente especial' },
    { id: 3, nombre: 'Docente ocasional' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.usuarioService.getDocentes().subscribe(data => {
      this.docentes = data;
    });

    this.form = this.fb.group({
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
      destino_rp:               ['', Validators.required],
      lugar_salida_rp:          ['', Validators.required],
      lugar_regreso_rp:         ['', Validators.required],
      fecha_salida_aprox_rp:    ['', Validators.required],
      fecha_regreso_aprox_rp:   ['', Validators.required],
      duracion_num_dias_rp:     [null, [Validators.required, Validators.min(1)]],
      ruta_principal:           [''],
      destino_ra:               [''],
      fecha_salida_aprox_ra:    [''],
      fecha_regreso_aprox_ra:   [''],
      duracion_num_dias_ra:     [null],
      ruta_alterna:             [''],
      id_docente_responsable:   [null, Validators.required],
      id_docente_apoyo:         [null],
    });
  }

  get esVinculacionEspecial(): boolean {
    return this.form.get('id_tipo_vinculacion')?.value === 2;
  }

  getNombreDocente(u: Usuario): string {
    return `${u.primer_nombre} ${u.primer_apellido}`;
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