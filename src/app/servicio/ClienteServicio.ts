import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Cliente} from '../modelo/Cliente';

@Injectable()
export class ClienteServicio {
  private url = environment.facturacionServicio + 'cliente';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {}

  obtenerPorIdentificacionEmpresa(identificacion: string, idEmpresa: number) {
    const url = `${this.url}/identificacion_empresa/${identificacion}/${idEmpresa}`;
    return this.httpClient.get(url, { headers: this.headers })
      .toPromise()
      .then(res => res)
      .then(data => data as Cliente);
  }
}
