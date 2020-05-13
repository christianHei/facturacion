import {FacturaDetalle} from './FacturaDetalle';
import {Cliente} from './Cliente';

export class Factura {
  id: number;
  numeroFactura: string;
  fecha: Date = new Date();
  subtotal: number;
  subtotalIva: number;
  iva: number;
  total: number;
  cliente: Cliente = new Cliente();
  listaFacturaDetalle: FacturaDetalle[] = [];
}
