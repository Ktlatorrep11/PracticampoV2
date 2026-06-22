import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Programacion } from '../../../shared/models';
import { ProgramacionService } from '../../programacion/services/programacion.service';

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
    });
  }

  guardar(): void {
    if (this.form.valid) {
      console.log('Solicitud:', this.form.value);
      this.router.navigate(['/pages/solicitudes']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/pages/solicitudes']);
  }

}