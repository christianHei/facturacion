import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidacionCampo} from '../../validacion/ValidacionCampo';
import {Properties} from '../../properties';
import {DatosServicio} from '../../servicio/DatosServicio';
import {NotificacionServicio} from '../../servicio/NotificacionServicio';
import {UsuarioServicio} from '../../servicio/UsuarioServicio';
import {Usuario} from '../../modelo/Usuario';
import {ParametroServicio} from '../../servicio/ParametroServicio';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [UsuarioServicio, ParametroServicio]
})
export class LoginComponent extends ValidacionCampo implements OnInit, OnDestroy {

  usuario: Usuario;

  constructor(public datosServicio: DatosServicio,
              public properties: Properties,
              private usuarioServicio: UsuarioServicio,
              private notificacionServicio: NotificacionServicio,
              private parametroServicio: ParametroServicio,
              private router: Router,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombreUsuario: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.usuario = new  Usuario();
  }

  ngOnDestroy() {
    this.datosServicio.usuario = this.usuario;
    this.datosServicio.empresa = this.usuario.empresa;
    this.parametroServicio.obtenerPorNombre(this.properties.parametro_iva)
      .then(parametro => this.datosServicio.parametroIva = parametro);
  }

  iniciarSesion() {
    this.btnIniciarClick = true;
    if (this.form.valid) {
      this.usuarioServicio.login(this.usuario.nombreUsuario, this.usuario.clave)
        .then((usuario: Usuario) => {
          if (usuario !== null) {
            this.usuario = usuario;
            this.router.navigate(['/inicio']);
          } else {
            this.notificacionServicio.notificar('warn', this.properties.warn_usuario_clave_incorrecto);
          }
        })
        .catch();
    }
  }

  registro() {
    this.router.navigate(['/empresa']);
  }

  recuperarClave() {
    this.router.navigate(['/recuperar-clave']);
  }
}
