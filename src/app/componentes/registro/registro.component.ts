import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidacionCampo} from '../../validacion/ValidacionCampo';
import {Usuario} from '../../modelo/Usuario';
import {Empresa} from '../../modelo/Empresa';
import {DatosServicio} from '../../servicio/DatosServicio';
import {Properties} from '../../properties';
import {RestServicio} from '../../servicio/RestServicio';
import {NotificacionServicio} from '../../servicio/NotificacionServicio';
import {UsuarioServicio} from '../../servicio/UsuarioServicio';
import {EmailServicio} from '../../servicio/EmailServicio';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass'],
  providers: [RestServicio, UsuarioServicio, EmailServicio]
})
export class RegistroComponent extends ValidacionCampo implements OnInit {

  usuario: Usuario;
  empresa: Empresa;
  confirmarClave: string;
  ocultar: boolean;

  constructor(public datosServicio: DatosServicio,
              public properties: Properties,
              private usuarioServicio: UsuarioServicio,
              private restServicio: RestServicio,
              private notificacionServicio: NotificacionServicio,
              private emailServicio: EmailServicio,
              private router: Router,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      nombreUsuario: [null, Validators.required],
      clave: [null, Validators.required],
      confirmarClave: [null, Validators.required],
    });
    this.ocultar = true;
    this.usuario = new Usuario();
    this.empresa = this.datosServicio.empresa;
  }

  guardar() {
    this.btnIniciarClick = true;
    if (this.form.valid) {
      if (this.usuario.clave === this.confirmarClave) {
        this.emailServicio.validarEmail(this.usuario.email)
          .then(esEmail => {
            if (esEmail) {
              this.usuario.empresa = this.empresa;
              this.usuarioServicio.obtenerPorNombreUsuario(this.usuario.nombreUsuario)
                .then((usuario: Usuario) => {
                  if (usuario === null) {
                    this.restServicio.guardar('usuario/', this.usuario)
                      .then(() => {
                        this.ocultar = false;
                        this.notificacionServicio.notificar('success', this.properties.succes_guardar);
                      });
                  } else {
                    this.notificacionServicio.notificar('warn', this.properties.warn_usuario_existe);
                  }
                });
            } else {
              this.notificacionServicio.notificar('warn', this.properties.warn_email_incorrecto);
            }
          })
          .catch( (err: any) => {
            if (err.value === 406) { // error de registro duplicado
              this.notificacionServicio.notificar('error', err.reasonPhrase);
              return;
            } else { // cualquier otro error
              this.notificacionServicio.notificar('error', err.reasonPhrase);
            }
          });
      } else {
        this.notificacionServicio.notificar('warn', this.properties.warn_claves_diferentes);
      }
    }
  }

  empezar() {
    this.router.navigate(['/']);
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
