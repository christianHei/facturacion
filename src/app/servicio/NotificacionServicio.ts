import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

type Severities = 'success' | 'info' | 'warn' | 'error';

/**
 * Servicio para mostrar mensajes de notificación: succes, info, warn, error
 * @author Christian Juiña
 */
@Injectable()
export class NotificacionServicio {
  notificarCambio: Subject<Object> = new Subject<Object>();

  notificar(severity: Severities, detail?: string) {
    this.notificarCambio.next({severity, detail: detail || 'Comuníquese con el administrador.'});
  }
}
