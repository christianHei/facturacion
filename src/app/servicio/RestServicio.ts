import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Servicio comun para guardar, eliminar, editar Objetos
 * @author Christian Juiña
 */
@Injectable()
export class RestServicio {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private url = environment.facturacionServicio;

  constructor(private httpClient: HttpClient) {}

  /**
   * Guardar objeto
   * @param urlEntidad url entidad
   * @param obj Objeto
   */
  guardar( urlEntidad: string, obj: any ) {
    return this.httpClient
      .post(this.url + urlEntidad, JSON.stringify(obj), { headers: this.headers } )
      .toPromise()
      .then(res => res )
      .catch((resp: any) => this.handleError(resp) );
  }

  /**
   * Mensaje de error
   * @param error error
   */
  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

}
