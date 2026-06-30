import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-ejecucion',
  templateUrl: './dialogo-ejecucion.component.html',
})
export class DialogoEjecucionComponent {

  requiereAvance = false;
  requiereTransporte = false;

  constructor(public dialogRef: MatDialogRef<DialogoEjecucionComponent>) {}

  confirmar(): void {
    this.dialogRef.close({
      requiereAvance: this.requiereAvance,
      requiereTransporte: this.requiereTransporte,
    });
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }

}