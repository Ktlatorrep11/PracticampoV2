import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLES } from '../../../shared/models';
import { UsuarioService } from '../services/usuario.service';
import { OatiSGAService, DatosSGA } from '../../../shared/services/oati-sga.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  form!: FormGroup;
  rolesArray = Object.entries(ROLES).map(([id, nombre]) => ({ id: Number(id), nombre }));
  datosSGA: DatosSGA | null = null;
  buscando = false;
  noEncontrado = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private sgaService: OatiSGAService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      num_identificacion: ['', Validators.required],
      id_role:            [null, Validators.required],
    });
  }

  buscarEnSGA(): void {
    const cedula = this.form.get('num_identificacion')?.value;
    if (!cedula) return;

    this.buscando = true;
    this.noEncontrado = false;
    this.datosSGA = null;

    this.sgaService.getFuncionario(cedula).subscribe(datos => {
      this.buscando = false;
      if (datos) {
        this.datosSGA = datos;
      } else {
        this.noEncontrado = true;
      }
    });
  }

  guardar(): void {
    if (this.form.valid && this.datosSGA) {
      const usuario = {
        usuario: this.datosSGA.email.split('@')[0],
        email: this.datosSGA.email,
        id_role: this.form.get('id_role')?.value,
        primer_nombre: this.datosSGA.primer_nombre,
        segundo_nombre: this.datosSGA.segundo_nombre,
        primer_apellido: this.datosSGA.primer_apellido,
        segundo_apellido: this.datosSGA.segundo_apellido,
        id_tipo_vinculacion: 1,
        id_programa_academico: 0,
        id_espacio_academico_1: 0,
        id_espacio_academico_2: 0,
        id_espacio_academico_3: 0,
        id_espacio_academico_4: 0,
        id_espacio_academico_5: 0,
        id_espacio_academico_6: 0,
        id_estado: 1,
        telefono: this.datosSGA.telefono,
        celular: this.datosSGA.celular,
      };
      this.usuarioService.crear(usuario).subscribe(() => {
        this.router.navigate(['/pages/usuarios']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/pages/usuarios']);
  }

}