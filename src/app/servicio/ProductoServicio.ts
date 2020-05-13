import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Producto} from '../modelo/Producto';

@Injectable()
export class ProductoServicio {
  private url = environment.facturacionServicio + 'producto';
  constructor(private httpClient: HttpClient) {}

  obtenerPorEmpresa(idEmpresa: number) {
    const url = `${this.url}/empresa/${idEmpresa}`;
    return this.httpClient.get(url)
      .toPromise()
      .then(res =>  res)
      .then(data => data as Producto[]);
  }
}
