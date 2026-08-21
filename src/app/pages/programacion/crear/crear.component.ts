import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../shared/models';
import { UsuarioService } from '../../usuarios/services/usuario.service';
import { ProgramacionService } from '../services/programacion.service';

@Component({
  selector: 'app-crear-programacion',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  form!: FormGroup;
  paso = 1;
  totalPasos = 8;
  docentes: Usuario[] = [];

  cantidadGrupos = [1, 2, 3, 4];
  tiposVinculacion = [
    { id: 1, nombre: 'Docente de planta' },
    { id: 2, nombre: 'Docente especial' },
    { id: 3, nombre: 'Docente ocasional' },
  ];

  // SIMULACIÓN de datos del SGA — asigna a cada docente sus espacios académicos, programa y vinculación
  // Cuando se conecte el SGA real, esto se reemplaza por una consulta al servicio institucional
  datosDocenteSGA: any = {
    1: { id_tipo_vinculacion: 1, espacios: [{ id: 1, nombre: 'Ecología', id_programa_academico: 1 }, { id: 2, nombre: 'Botánica', id_programa_academico: 1 }] },
    2: { id_tipo_vinculacion: 2, espacios: [{ id: 3, nombre: 'Zoología', id_programa_academico: 2 }] },
    3: { id_tipo_vinculacion: 3, espacios: [{ id: 1, nombre: 'Ecología', id_programa_academico: 1 }] },
  };

  espaciosDelDocente: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private programacionService: ProgramacionService,
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
      det_materiales:           [''],
      valor_materiales:         [0],
      det_guias_baquianos:      [''],
      valor_guias_baquianos:    [0],
      det_otros_boletas:        [''],
      valor_otros_boletas:      [0],
      areas_acuaticas:          [false],
      alturas:                  [false],
      riesgo_biologico:         [false],
      espacios_confinados:      [false],
      plan_contingencia:        [false],
      viaticos_estudiantes:     [0],
      viaticos_docente:         [0],
      valor_estimado_transporte:[0],
      valor_total:              [0],
 cronograma_recorrido:     ['', Validators.required],
      justificacion:            ['', Validators.required],
      objetivo_general:         ['', Validators.required],
      metodologia:              ['', Validators.required],
    });

  }

onDocenteSeleccionado(idDocente: number): void {
    const datos = this.datosDocenteSGA[idDocente];
    if (datos) {
      this.espaciosDelDocente = datos.espacios;
      this.form.patchValue({
        id_tipo_vinculacion: datos.id_tipo_vinculacion,
        id_espacio_academico: null,
        id_programa_academico: null,
      });
    } else {
      this.espaciosDelDocente = [];
      this.form.patchValue({ id_tipo_vinculacion: null, id_espacio_academico: null, id_programa_academico: null });
    }
  }

  onEspacioSeleccionado(idEspacio: number): void {
    const espacio = this.espaciosDelDocente.find(e => e.id === idEspacio);
    if (espacio) {
      this.form.patchValue({ id_programa_academico: espacio.id_programa_academico });
    }
  }
  get esVinculacionEspecial(): boolean {
    return this.form.get('id_tipo_vinculacion')?.value === 2;
  }

  fechasValidas(): boolean {
    const salida = this.form.get('fecha_salida_aprox_rp')?.value;
    const regreso = this.form.get('fecha_regreso_aprox_rp')?.value;
    if (!salida || !regreso) return true;
    return new Date(regreso) >= new Date(salida);
  }

  getNombreDocente(u: Usuario): string {
    return `${u.primer_nombre} ${u.primer_apellido}`;
  }

   getNombreVinculacion(id: number): string {
    const tipo = this.tiposVinculacion.find(t => t.id === id);
    return tipo ? tipo.nombre : '';
  }

  getNombrePrograma(id: number): string {
    const programas: any = { 1: 'Ingeniería Forestal', 2: 'Administración Ambiental' };
    return programas[id] || '';
  }

 onTextosGenerados(textos: any): void {
    this.form.patchValue({
      justificacion: textos.justificacion,
      objetivo_general: textos.objetivo_general,
      metodologia: textos.metodologia
    });
  }

  calcularPresupuesto(): void {
    const numEstudiantes = this.form.get('num_estudiantes_aprox')?.value || 0;
    const dias = this.form.get('duracion_num_dias_rp')?.value || 0;
    const realizadaBogota = this.form.get('destino_rp')?.value?.toLowerCase().includes('bogot') || false;
    const numDocentes = this.form.get('id_docente_apoyo')?.value ? 2 : 1;

    let viaticosDocente = 0;
    if (dias > 1) {
      viaticosDocente = (dias - 0.5) * 198600 * numDocentes;
    }

    let auxilioEstudiantes = 0;
    if (!realizadaBogota) {
      if (dias === 1) {
        auxilioEstudiantes = 70000 * numEstudiantes;
      } else if (dias > 1) {
        auxilioEstudiantes = 105000 * numEstudiantes * dias;
      }
    }

    const materiales = this.form.get('valor_materiales')?.value || 0;
    const guiasBaquianos = this.form.get('valor_guias_baquianos')?.value || 0;
    const otrosBoletas = this.form.get('valor_otros_boletas')?.value || 0;
    const transporteMenor = this.form.get('valor_estimado_transporte')?.value || 0;

    const total = viaticosDocente + auxilioEstudiantes + materiales + guiasBaquianos + otrosBoletas + transporteMenor;

    this.form.patchValue({
      viaticos_docente: viaticosDocente,
      viaticos_estudiantes: auxilioEstudiantes,
      valor_total: total
    }, { emitEvent: false });
  }

    siguiente(): void {
    if (this.paso === 1 && this.esVinculacionEspecial && !this.form.get('id_docente_apoyo')?.value) {
      alert('El docente es de vinculación especial. Debe seleccionar un docente de planta que lo acompañe antes de continuar. Puedes asignarlo en el Paso 4 - Docentes, o cambiar el tipo de vinculación.');
      return;
    }
    if (this.paso === 2 && !this.fechasValidas()) {
      alert('La fecha de regreso no puede ser anterior a la fecha de salida. Por favor corrígela.');
      return;
    }
    if (this.paso === 6) {
      this.calcularPresupuesto();
    }
    if (this.paso < this.totalPasos) this.paso++;
  }

  anterior(): void {
    if (this.paso > 1) this.paso--;
  }

   guardar(): void {
    if (this.esVinculacionEspecial && !this.form.get('id_docente_apoyo')?.value) {
      alert('El docente es de vinculación especial y no tiene un docente de apoyo asignado. No se puede guardar la programación sin este requisito.');
      return;
    }
    if (this.form.valid) {
      if (!confirm('¿Confirmas guardar esta programación? Podrás editarla mientras esté en estado borrador.')) return;
      this.programacionService.crear(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/pages/programaciones']);
        },
        error: () => {
          alert('Ocurrió un error al guardar la programación. Por favor intenta de nuevo.');
        }
      });
    } else {
      this.form.markAllAsTouched();
      alert('Faltan campos obligatorios por completar. Revisa los pasos marcados con * antes de guardar.');
    }
  }

  cancelar(): void {
    this.router.navigate(['/pages/programaciones']);
  }

}