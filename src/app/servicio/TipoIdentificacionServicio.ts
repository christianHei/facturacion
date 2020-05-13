import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {TipoIdentificacion} from '../modelo/TipoIdentificacion';

@Injectable()
export class TipoIdentificacionServicio {
  private url = environment.facturacionServicio + 'tipo-identificacion';
  constructor(private httpClient: HttpClient) {}

  obtenerTodo() {
    return this.httpClient.get(this.url)
      .toPromise()
      .then(res =>  res)
      .then(data => data['_embedded'].tipoIdentificaciones as TipoIdentificacion[]);
  }
}
