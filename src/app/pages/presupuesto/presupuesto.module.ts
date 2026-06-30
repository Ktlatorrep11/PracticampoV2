import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListadoPresupuestoComponent } from './listado/listado.component';

const routes: Routes = [
  { path: '', component: ListadoPresupuestoComponent },
];

@NgModule({
  declarations: [
    ListadoPresupuestoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatProgressSpinnerModule,
  ]
})
export class PresupuestoModule { }