import {Identificacion} from './Identificacion';
import {Empresa} from './Empresa';

export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  celular: string;
  email: string;
  direccion: string;
  empresa: Empresa = new Empresa();
  listaIdentificaciones: Identificacion[];
}
