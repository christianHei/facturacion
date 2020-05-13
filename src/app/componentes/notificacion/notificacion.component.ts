import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Message} from 'primeng';
import {NotificacionServicio} from '../../servicio/NotificacionServicio';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.sass']
})
export class NotificacionComponent implements OnInit, OnDestroy {

  msgs: Message[] = [];
  subscription: Subscription;

  constructor(private notificacionServicio: NotificacionServicio) { }

  ngOnInit() {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.subscription = this.notificacionServicio.notificarCambio
      .subscribe(notification => {
        this.msgs.length = 0;
        this.msgs.push(notification);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
