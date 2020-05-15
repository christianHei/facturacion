import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EmailServicio {
  private url = environment.facturacionServicio + 'email';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {}

  validarEmail(email: string) {
    const url = `${this.url}/validar/${email}`;
    return this.httpClient.get(url, { headers: this.headers })
      .toPromise()
      .then(res =>  res)
      .then(data => data  as boolean);
  }

  enviarEmail(email: string) {
    const url = `${this.url}/enviar/email/${email}`;
    return this.httpClient.get(url, { headers: this.headers })
      .toPromise()
      .then(res =>  res)
      .then(data => data  as boolean);
  }
}
