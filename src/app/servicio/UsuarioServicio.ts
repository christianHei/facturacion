import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Usuario} from '../modelo/Usuario';

@Injectable()
export class UsuarioServicio {
  private url = environment.facturacionServicio + 'usuario';
  constructor(private httpClient: HttpClient) {}

  obtenerPorNombreUsuario(nombreUsuario: string) {
    const url = `${this.url}/nombre_usuario/${nombreUsuario}`;
    return this.httpClient.get(url)
      .toPromise()
      .then(res =>  res)
      .then(data => data  as Usuario);
  }

  login(nombreUsuario: string, clave: string) {
    const url = `${this.url}/${nombreUsuario}/${clave}`;
    return this.httpClient.get(url)
      .toPromise()
      .then(res =>  res)
      .then(data => data  as Usuario);
  }
}
