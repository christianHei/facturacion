import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EmailServicio {
  private url = environment.facturacionServicio + 'email';
  constructor(private httpClient: HttpClient) {}

  validarEmail(email: string) {
    const url = `${this.url}/${email}`;
    return this.httpClient.get(url)
      .toPromise()
      .then(res =>  res)
      .then(data => data  as boolean);
  }
}
