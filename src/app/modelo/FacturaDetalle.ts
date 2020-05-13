import {Producto} from './Producto';
import {Factura} from './Factura';

export class FacturaDetalle {
  id: number;
  cantidad: number;
  precio: number;
  producto: Producto = new Producto();
  factura: Factura = new Factura();
}
