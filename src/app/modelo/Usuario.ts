import {Empresa} from './Empresa';

export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  email: string;
  clave: string;
  empresa: Empresa = new Empresa();
}
