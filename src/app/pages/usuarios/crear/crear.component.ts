import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLES } from '../../../shared/models';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  form!: FormGroup;
  roles = ROLES;
  rolesArray = Object.entries(ROLES).map(([id, nombre]) => ({ id: Number(id), nombre }));

  tiposVinculacion = [
    { id: 1, nombre: 'Docente de planta' },
    { id: 2, nombre: 'Docente especial' },
    { id: 3, nombre: 'Docente ocasional' },
    { id: 4, nombre: 'Administrativo' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      usuario:            ['', Validators.required],
      email:              ['', [Validators.required, Validators.email]],
      id_role:            [null, Validators.required],
      primer_nombre:      ['', Validators.required],
      segundo_nombre:     [''],
      primer_apellido:    ['', Validators.required],
      segundo_apellido:   [''],
      id_tipo_vinculacion:[null, Validators.required],
      telefono:           [''],
      celular:            [''],
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.usuarioService.crear(this.form.value).subscribe(() => {
        this.router.navigate(['/pages/usuarios']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/pages/usuarios']);
  }

}