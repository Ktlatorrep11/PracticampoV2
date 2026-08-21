
import { Component } from '@angular/core';

interface Mensaje {
  texto: string;
  esUsuario: boolean;
}

@Component({
  selector: 'app-chatbot',
  template: `
    <div class="chatbot-flotante">
      <button *ngIf="!abierto" class="chatbot-boton" (click)="abierto = true">
        💬
      </button>

      <div *ngIf="abierto" class="chatbot-ventana">
        <div class="chatbot-cabecera">
          <span>Asistente PractiCampoUD</span>
          <button (click)="abierto = false">✕</button>
        </div>

        <div class="chatbot-mensajes" #contenedorMensajes>
          <div *ngFor="let m of mensajes" [class]="m.esUsuario ? 'msg msg-usuario' : 'msg msg-bot'">
            {{ m.texto }}
          </div>
        </div>

        <div class="chatbot-preguntas" *ngIf="mostrarSugerencias">
          <button *ngFor="let p of preguntasFrecuentes" (click)="preguntar(p)">{{ p }}</button>
        </div>

        <div class="chatbot-input">
          <input type="text" [(ngModel)]="textoInput" placeholder="Escribe tu pregunta..."
                 (keyup.enter)="enviar()">
          <button (click)="enviar()">➤</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-flotante {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
    }
    .chatbot-boton {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #2e7d32;
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }
    .chatbot-ventana {
      width: 340px;
      height: 460px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .chatbot-cabecera {
      background: #2e7d32;
      color: white;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
    }
    .chatbot-cabecera button {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
    }
    .chatbot-mensajes {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .msg {
      padding: 8px 12px;
      border-radius: 10px;
      font-size: 13px;
      max-width: 85%;
      line-height: 1.4;
    }
    .msg-bot {
      background: #eef5ee;
      color: #333;
      align-self: flex-start;
    }
    .msg-usuario {
      background: #2e7d32;
      color: white;
      align-self: flex-end;
    }
    .chatbot-preguntas {
      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      border-top: 1px solid #eee;
    }
    .chatbot-preguntas button {
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 14px;
      padding: 6px 10px;
      font-size: 11.5px;
      text-align: left;
      cursor: pointer;
    }
    .chatbot-input {
      display: flex;
      border-top: 1px solid #eee;
      padding: 10px;
      gap: 8px;
    }
    .chatbot-input input {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 13px;
      outline: none;
    }
    .chatbot-input button {
      background: #2e7d32;
      color: white;
      border: none;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      cursor: pointer;
    }
  `]
})
export class ChatbotComponent {

  abierto = false;
  textoInput = '';
  mostrarSugerencias = true;

  preguntasFrecuentes = [
    '¿Cómo creo una programación?',
    '¿Qué documentos necesitan los estudiantes?',
    '¿Cómo apruebo una solicitud?',
    '¿Cómo genero la resolución?',
  ];

  mensajes: Mensaje[] = [
    { texto: '¡Hola! Soy el asistente de PractiCampoUD. ¿En qué te puedo ayudar?', esUsuario: false }
  ];

  private respuestas: { claves: string[]; respuesta: string }[] = [
    {
      claves: ['crear', 'nueva', 'programacion', 'programación'],
      respuesta: 'Para crear una programación ve al menú "Programaciones" y haz clic en "Nueva Programación". Deberás completar 8 pasos: datos básicos, ruta principal, ruta alterna, docentes, materiales, riesgos, presupuesto e información académica.'
    },
    {
      claves: ['documento', 'estudiante', 'requerid'],
      respuesta: 'Los documentos que se piden a los estudiantes son: seguro estudiantil, documento de identificación, certificado EPS (obligatorios), y opcionalmente permiso de acudiente, vacunas y certificado de natación según la práctica.'
    },
    {
      claves: ['aprobar', 'aprobación', 'solicitud'],
      respuesta: 'El flujo de aprobación de una solicitud es: Docente envía → Coordinador aprueba → Decano da visto bueno. Puedes ver el estado actual en el detalle de cada solicitud.'
    },
    {
      claves: ['resolucion', 'resolución', 'pdf'],
      respuesta: 'Para generar la resolución, entra al detalle de la Solicitud y haz clic en el botón "Resolución". Podrás editar los datos y luego imprimir o guardar como PDF.'
    },
    {
      claves: ['viatico', 'viático', 'presupuesto'],
      respuesta: 'El presupuesto se calcula automáticamente en el Paso 7 de la programación según el número de estudiantes, docentes y días de la práctica, usando las tarifas vigentes.'
    },
    {
      claves: ['excel', 'listado', 'importar'],
      respuesta: 'Puedes importar el listado de estudiantes desde un archivo Excel en el detalle de la Solicitud, con el botón "Importar listado (Excel)". El archivo debe tener una columna llamada "documento" o "cedula".'
    },
  ];

  preguntar(pregunta: string): void {
    this.textoInput = pregunta;
    this.enviar();
  }

  enviar(): void {
    const texto = this.textoInput.trim();
    if (!texto) return;

    this.mensajes.push({ texto, esUsuario: true });
    this.mostrarSugerencias = false;

    const respuesta = this.buscarRespuesta(texto);
    setTimeout(() => {
      this.mensajes.push({ texto: respuesta, esUsuario: false });
    }, 400);

    this.textoInput = '';
  }

  private buscarRespuesta(texto: string): string {
    const textoLower = texto.toLowerCase();
    for (const item of this.respuestas) {
      if (item.claves.some(clave => textoLower.includes(clave))) {
        return item.respuesta;
      }
    }
    return 'No tengo una respuesta exacta para eso todavía. Puedes escribir a soporte@udistrital.edu.co o preguntarle a tu Coordinador de proyecto curricular.';
  }

}