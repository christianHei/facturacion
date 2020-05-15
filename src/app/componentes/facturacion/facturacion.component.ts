import { Component, OnInit } from '@angular/core';
import {Producto} from '../../modelo/Producto';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidacionCampo} from '../../validacion/ValidacionCampo';
import {FacturaDetalle} from '../../modelo/FacturaDetalle';
import {DatosServicio} from '../../servicio/DatosServicio';
import {Identificacion} from '../../modelo/Identificacion';
import {Cliente} from '../../modelo/Cliente';
import {Properties} from '../../properties';
import {ProductoServicio} from '../../servicio/ProductoServicio';
import {Empresa} from '../../modelo/Empresa';
import {ConfirmationService, SelectItem} from 'primeng';
import {Factura} from '../../modelo/Factura';
import {RestServicio} from '../../servicio/RestServicio';
import {NotificacionServicio} from '../../servicio/NotificacionServicio';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.sass'],
  providers: [ProductoServicio, RestServicio, ConfirmationService]
})
export class FacturacionComponent extends ValidacionCampo implements OnInit {
  displayDialog: boolean;

  factura: Factura;
  facturaDetalle: FacturaDetalle;
  facturaDetalleSeleccionado: FacturaDetalle;
  nuevoDetalle: boolean;
  listaFacturaDetalle: FacturaDetalle[];
  columnas: any[];

  productos: Producto[];
  productosSelect: SelectItem[];

  identificacion: Identificacion;
  cliente: Cliente;
  empresa: Empresa;

  constructor(public datosServicio: DatosServicio,
              public properties: Properties,
              private productoServicio: ProductoServicio,
              private restServicio: RestServicio,
              private notificacionServicio: NotificacionServicio,
              private confirmationService: ConfirmationService,
              private router: Router,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      producto: [null, Validators.required],
      cantidad: [null, Validators.required]
    });

    this.columnas = [
      { field: 'producto', header: 'Producto' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'precio', header: 'Precio' }
    ];

    this.empresa = this.datosServicio.empresa;
    this.identificacion = this.datosServicio.identificacion;
    this.cliente = this.datosServicio.cliente;
    this.listaFacturaDetalle = [];
    this.cliente.empresa = this.empresa;

    this.productoServicio.obtenerPorEmpresa(this.empresa.id).then(productos => {
      this.productos = productos;
      this.productoSelectItem();
    });
    this.factura = new Factura();
    this.factura.fecha = new Date();
    this.factura.cliente = this.cliente;
  }

  agregar() {
    this.nuevoDetalle = true;
    this.facturaDetalle = new FacturaDetalle();
    this.facturaDetalle.producto = null;
    this.displayDialog = true;
  }

  guardarDetalle() {
    this.btnIniciarClick = true;
    if (this.form.valid) {
      const listaFacturaDetalle = [...this.listaFacturaDetalle];
      this.facturaDetalle.precio = this.facturaDetalle.cantidad * this.facturaDetalle.producto.precio;
      if (this.nuevoDetalle) {
        listaFacturaDetalle.push(this.facturaDetalle);
      } else {
        listaFacturaDetalle[this.listaFacturaDetalle.indexOf(this.facturaDetalleSeleccionado)] = this.facturaDetalle;
      }
      this.listaFacturaDetalle = listaFacturaDetalle;
      this.calcularTotal();
      this.displayDialog = false;
      this.router.navigate(['/facturacion']);
    }
  }

  calcularTotal() {
    this.factura.subtotalIva = 0;
    this.listaFacturaDetalle.forEach((facturaDetalle: FacturaDetalle) => {
      this.factura.subtotalIva = this.factura.subtotalIva + facturaDetalle.precio;
    });
    this.factura.subtotal = 0;
    this.factura.iva = this.factura.subtotalIva * (+this.datosServicio.parametroIva.valor / 100);
    this.factura.total = this.factura.subtotalIva + this.factura.iva;
  }

  eliminarDetalle() {
    const index = this.listaFacturaDetalle.indexOf(this.facturaDetalleSeleccionado);
    this.listaFacturaDetalle = this.listaFacturaDetalle.filter((val, i) => i !== index);
    this.calcularTotal();
    this.displayDialog = false;
    this.router.navigate(['/facturacion']);
  }

  cancelarDetalle() {
    this.router.navigate(['/facturacion']);
    this.displayDialog = false;
  }

  facturar() {
    if (this.listaFacturaDetalle.length !== 0) {
      this.factura.listaFacturaDetalle = this.listaFacturaDetalle;
      this.factura.numeroFactura = '0012145-001';
      this.restServicio.guardar('factura/', this.factura)
        .then(() => {
          this.router.navigate(['/inicio']);
        })
        .catch( (err: any) => {
          if (err.value === 406) {
            this.notificacionServicio.notificar('error', err.reasonPhrase);
            return;
          } else { // cualquier otro error
            this.notificacionServicio.notificar('error', err.reasonPhrase);
          }
        });
    } else {
      this.notificacionServicio.notificar('warn', this.properties.warn_datalle_vacio);
    }
  }

  cancelarFactura() {
    this.router.navigate(['/inicio']);
  }

  onRowSelect(event) {
    this.nuevoDetalle = false;
    this.facturaDetalle = this.clonarDetalleFactura(event.data);
    this.displayDialog = true;
  }

  clonarDetalleFactura(c: FacturaDetalle): FacturaDetalle {
    const facturaDetalle = new FacturaDetalle();
    for (let prop in c) {
      facturaDetalle[prop] = c[prop];
    }
    return facturaDetalle;
  }

  productoSelectItem() {
    this.productosSelect = [];
    this.productosSelect.push({label: this.properties.lbl_seleccione, value: null});
    this.productos.forEach(producto => {
      this.productosSelect.push({label: producto.descripcion, value: producto});
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: this.properties.confirm_facturar,
      header: this.properties.lbl_facturar,
      icon: 'pi pi-info-circle',
      acceptLabel: this.properties.btn_si,
      rejectLabel: this.properties.btn_no,
      accept: () => {
        this.facturar();
      },
      reject: () => {
      }
    });
  }
}
