import {Empresa} from './Empresa';

export class Producto {
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  empresa: Empresa = new Empresa();
  eliminado: string;
}
