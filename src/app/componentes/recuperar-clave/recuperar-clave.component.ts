import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidacionCampo} from '../../validacion/ValidacionCampo';
import {Properties} from '../../properties';
import {EmailServicio} from '../../servicio/EmailServicio';
import {NotificacionServicio} from '../../servicio/NotificacionServicio';
@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.sass'],
  providers: [EmailServicio]
})
export class RecuperarClaveComponent extends ValidacionCampo implements OnInit {

  email: string;

  constructor(public properties: Properties,
              private emailServicio: EmailServicio,
              private notificacionServicio: NotificacionServicio,
              private router: Router,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  enviar() {
    this.btnIniciarClick = true;
    if (this.form.valid) {
      this.emailServicio.enviarEmail(this.email)
        .then(resultado => {
          if (resultado) {
            this.notificacionServicio.notificar('success', this.properties.succes_envio_email);
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
    this.router.navigate(['/']);
  }
}
