import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-rechazo',
  templateUrl: './dialogo-rechazo.component.html',
})
export class DialogoRechazoComponent {

  observacion = '';

  constructor(public dialogRef: MatDialogRef<DialogoRechazoComponent>) {}

  confirmar(): void {
    if (this.observacion.trim()) {
      this.dialogRef.close(this.observacion);
    }
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }

}