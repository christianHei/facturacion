import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Parametro} from '../modelo/Parametro';

@Injectable()
export class ParametroServicio {
  private url = environment.facturacionServicio + 'parametro';
  constructor(private httpClient: HttpClient) {}

  obtenerPorNombre(nombre: string) {
    const url = `${this.url}/nombre/${nombre}`;
    return this.httpClient.get(url)
      .toPromise()
      .then(res =>  res)
      .then(data => data  as Parametro);
  }
}
