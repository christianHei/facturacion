import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Empresa} from '../modelo/Empresa';

@Injectable()
export class EmpresaServicio {
  private url = environment.facturacionServicio + 'empresa';
  constructor(private httpClient: HttpClient) {}

  obtenerPorRuc(ruc: string) {
    const url = `${this.url}/ruc/${ruc}`;
    return this.httpClient.get(url)
      .toPromise()
      .then(res => res)
      .then(data => data as Empresa);
  }
}
