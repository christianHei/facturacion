import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidacionCampo} from '../../validacion/ValidacionCampo';
import {TipoIdentificacionServicio} from '../../servicio/TipoIdentificacionServicio';
import {TipoIdentificacion} from '../../modelo/TipoIdentificacion';
import {SelectItem} from 'primeng';
import {Properties} from '../../properties';
import {Cliente} from '../../modelo/Cliente';
import {DatosServicio} from '../../servicio/DatosServicio';
import {Identificacion} from '../../modelo/Identificacion';
import {EmailServicio} from '../../servicio/EmailServicio';
import {NotificacionServicio} from '../../servicio/NotificacionServicio';
import {RestServicio} from '../../servicio/RestServicio';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.sass'],
  providers: [TipoIdentificacionServicio, EmailServicio, RestServicio],
})
export class ClienteComponent extends ValidacionCampo implements OnInit, OnDestroy {

  cliente: Cliente;
  identificacion: Identificacion;
  tipoIdentificaciones: TipoIdentificacion[];
  tipoIdentificacionesSelect: SelectItem[];
  tipoIdentificacion: TipoIdentificacion;

  constructor(public datosServicio: DatosServicio,
              public properties: Properties,
              private tipoIdentificacionServicio: TipoIdentificacionServicio,
              private emailServicio: EmailServicio,
              private notificacionServicio: NotificacionServicio,
              private restServicio: RestServicio,
              private router: Router,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.tipoIdentificacionServicio.obtenerTodo().then(tipoIdentificaciones => {
      this.tipoIdentificaciones = tipoIdentificaciones;
      this.tipoIdentificacionSelectItem();
    });
    this.form = this.formBuilder.group({
      tipoDocumento: [null, Validators.required],
      numeroDocumento: [null, Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefono: [null, Validators.required],
      direccion: [null, Validators.required],
    });
    this.cliente = new Cliente();
    this.identificacion = new Identificacion();
    this.tipoIdentificacion = null;
  }

  ngOnDestroy() {
    this.datosServicio.cliente = this.cliente;
    this.datosServicio.identificacion = this.identificacion;
  }

  guardar() {
    this.btnIniciarClick = true;
    if (this.form.valid) {
      this.emailServicio.validarEmail(this.cliente.email)
        .then(esEmail => {
          if (esEmail) {
            this.identificacion.tipoIdentificacion = this.tipoIdentificacion;
            this.cliente.listaIdentificaciones = [];
            this.cliente.listaIdentificaciones.push(this.identificacion);
            this.cliente.empresa = this.datosServicio.empresa;
            this.restServicio.guardar('cliente/', this.cliente);
            this.router.navigate(['/facturacion']);
            this.notificacionServicio.notificar('success', this.properties.succes_guardar);
          } else {
            this.notificacionServicio.notificar('warn', this.properties.warn_email_incorrecto);
          }
        })
        .catch( (err: any) => {
          if (err.value === 406) {
            this.notificacionServicio.notificar('error', err.reasonPhrase);
            return;
          } else { // cualquier otro error
            this.notificacionServicio.notificar('error', err.reasonPhrase);
          }
        });
    }
  }

  cancelar() {
    this.router.navigate(['/inicio']);
  }

  tipoIdentificacionSelectItem() {
    this.tipoIdentificacionesSelect = [];
    this.tipoIdentificacionesSelect.push({label: this.properties.lbl_seleccione, value: null});
    this.tipoIdentificaciones.forEach(tipoIdentificacion => {
      this.tipoIdentificacionesSelect.push({label: tipoIdentificacion.tipo, value: tipoIdentificacion});
    });
  }
}
