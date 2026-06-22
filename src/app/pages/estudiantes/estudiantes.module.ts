import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListadoEstudiantesComponent } from './listado/listado.component';
import { InscripcionEstudianteComponent } from './inscripcion/inscripcion.component';
import { ReplacePipe } from '../../shared/pipes/replace.pipe';

const routes: Routes = [
  { path: ':idSolicitud', component: ListadoEstudiantesComponent },
  { path: ':idSolicitud/inscribir', component: InscripcionEstudianteComponent },
];

@NgModule({
  declarations: [
    ListadoEstudiantesComponent,
    InscripcionEstudianteComponent,
    ReplacePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class EstudiantesModule { }