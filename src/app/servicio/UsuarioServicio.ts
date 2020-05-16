import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Usuario} from '../modelo/Usuario';

@Injectable()
export class UsuarioServicio {
  private url = environment.facturacionServicio + 'usuario';

  header: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {}

  obtenerPorNombreUsuario(nombreUsuario: string) {

    this.header.set('Content-Type', 'application/json');
    this.header.append('Access-Control-Allow-Origin', '*');
    this.header.append('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE');
    this.header.append( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    const url = `${this.url}/usuario/nombre/usuario/${nombreUsuario}`;
    return this.httpClient.get(url, {headers: this.header})
      .toPromise()
      .then(res =>  res)
      .then(data => data  as Usuario);
  }

  login(nombreUsuario: string, clave: string) {


    this.header.set('Content-Type', 'application/json');
    this.header.append('Access-Control-Allow-Origin', '*');
    this.header.append('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE');
    this.header.append( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    const url = `${this.url}/${nombreUsuario}/${clave}`;
    return this.httpClient.get(url, {headers: this.header})
      .toPromise()
      .then(res =>  res)
      .then(data => data  as Usuario);
  }
}
