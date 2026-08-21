
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GroqService } from '../services/groq.service';

@Component({
  selector: 'app-ai-generator',
  template: `
    <div class="ai-generator">
    <p>PRUEBA - el componente carga</p >
      <button 
        type="button"
        (click)="generarConIA()" 
        [disabled]="cargando || !materia || !destino"
        class="btn-ia">
        <span *ngIf="!cargando">✨ Generar con IA</span>
        <span *ngIf="cargando">⏳ Generando...</span>
      </button>

      <small *ngIf="!materia || !destino" class="texto-ayuda">
        Completa el espacio académico y destino para usar la IA
      </small>

      <div *ngIf="error" class="error-ia">
        ⚠️ No se pudo generar el texto. Inténtalo de nuevo.
      </div>
    </div>
  `,
  styles: [`
    .ai-generator { margin: 16px 0; }
    .btn-ia {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    }
    .btn-ia:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-ia:hover:not(:disabled) { opacity: 0.9; }
    .texto-ayuda { color: #888; display: block; margin-top: 6px; }
    .error-ia { color: #e53935; margin-top: 8px; font-size: 13px; }
  `]
})
export class AiGeneratorComponent {

  @Input() materia: string = '';
  @Input() destino: string = '';
  @Input() diasDuracion: number = 1;
  @Output() textosGenerados = new EventEmitter<any>();

  cargando = false;
  error = false;

  constructor(private groqService: GroqService) {}

  generarConIA() {
    this.cargando = true;
    this.error = false;

    this.groqService.generarTextosPractica(
      this.materia, 
      this.destino, 
      this.diasDuracion
    ).subscribe({
      next: (response: any) => {
        try {
          const contenido = response.choices[0].message.content;
          const textos = JSON.parse(contenido);
          this.textosGenerados.emit(textos);
        } catch (e) {
          this.error = true;
        }
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }
}
