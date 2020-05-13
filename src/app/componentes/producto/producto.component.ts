import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ValidacionCampo} from '../../validacion/ValidacionCampo';
import {Producto} from '../../modelo/Producto';
import {ProductoServicio} from '../../servicio/ProductoServicio';
import {Empresa} from '../../modelo/Empresa';
import {Properties} from '../../properties';
import {DatosServicio} from '../../servicio/DatosServicio';
import {NotificacionServicio} from '../../servicio/NotificacionServicio';
import {RestServicio} from '../../servicio/RestServicio';
import {ConfirmationService} from 'primeng';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.sass'],
  providers: [ProductoServicio, RestServicio, ConfirmationService],
})
export class ProductoComponent extends ValidacionCampo implements OnInit {

  displayDialog: boolean;
  producto: Producto;
  nuevoProducto: boolean;
  productos: Producto[];
  columnas: any[];
  empresa: Empresa;

  constructor(public datosServicio: DatosServicio,
              private restServicio: RestServicio,
              private productoServicio: ProductoServicio,
              private properties: Properties,
              private notificacionServicio: NotificacionServicio,
              private confirmationService: ConfirmationService,
              private router: Router,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.empresa = this.datosServicio.empresa;
    this.productoServicio.obtenerPorEmpresa(this.empresa.id).then(productos => this.productos = productos);
    this.form = this.formBuilder.group({
      descripcion: [null, Validators.required],
      codigo: [],
      precio: [null, Validators.required],
    });

    this.columnas = [
      { field: 'descripcion', header: 'Descripción' },
      { field: 'codigo', header: 'Código' },
      { field: 'precio', header: 'Precio' }
    ];
  }

  agregar() {
    this.nuevoProducto = true;
    this.producto = new Producto();
    this.displayDialog = true;
  }

  guardar() {
    this.btnIniciarClick = true;
    if (this.form.valid) {
      this.producto.empresa = this.empresa;
      this.restServicio.guardar('producto/', this.producto)
        .then(() => {
          this.refrescar();
          this.router.navigate(['/producto']);
          if (this.nuevoProducto) {
            this.notificacionServicio.notificar('success', this.properties.succes_guardar);
          } else {
            this.notificacionServicio.notificar('success', this.properties.succes_actualizar);
          }
        })
        .catch(() => {
          if (this.nuevoProducto) {
            this.notificacionServicio.notificar('warn', this.properties.warn_guardar);
          } else {
            this.notificacionServicio.notificar('warn', this.properties.warn_actualizar);
          }
        });
      this.displayDialog = false;
    }
  }

  eliminar() {
    console.log(this.producto.eliminado);
    this.restServicio.guardar('producto/eliminar/', this.producto)
      .then(() => {
        this.refrescar();
        this.router.navigate(['/producto']);
        this.notificacionServicio.notificar('success', this.properties.succes_eliminar);
      })
      .catch(() => {
        this.notificacionServicio.notificar('warn', this.properties.warn_eliminar);
      });
    this.displayDialog = false;
  }

  cancelar() {
    this.router.navigate(['/producto']);
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.nuevoProducto = false;
    this.producto = this.clonarProducto(event.data);
    this.displayDialog = true;
  }

  clonarProducto(p: Producto) {
    const producto = new Producto();
    for (let prop in p) {
      producto[prop] = p[prop];
    }
    return producto;
  }

  confirm() {
    this.confirmationService.confirm({
      message: this.properties.confirm_eliminar,
      header: this.properties.btn_eliminar,
      icon: 'pi pi-info-circle',
      acceptLabel: this.properties.btn_si,
      rejectLabel: this.properties.btn_no,
      accept: () => {
        this.eliminar();
      },
      reject: () => {
        this.cancelar();
      }
    });
  }

  refrescar() {
    this.productoServicio.obtenerPorEmpresa(this.empresa.id).then(productos => this.productos = productos);
  }
}
