import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListadoEstudiantesComponent } from './listado/listado.component';
import { ReplacePipe } from '../../shared/pipes/replace.pipe';

const routes: Routes = [
  { path: ':idSolicitud', component: ListadoEstudiantesComponent },
];

@NgModule({
  declarations: [
    ListadoEstudiantesComponent,
    ReplacePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ]
})
export class EstudiantesModule { }