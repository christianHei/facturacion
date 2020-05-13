import {Cliente} from './Cliente';
import {TipoIdentificacion} from './TipoIdentificacion';

export class Identificacion {
  id: number;
  numero: string;
  cliente: Cliente = new Cliente();
  tipoIdentificacion: TipoIdentificacion = new TipoIdentificacion();
}
