import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidacionCampo} from '../../validacion/ValidacionCampo';
import {Empresa} from '../../modelo/Empresa';
import {DatosServicio} from '../../servicio/DatosServicio';
import {Properties} from '../../properties';
import {NotificacionServicio} from '../../servicio/NotificacionServicio';
import {EmpresaServicio} from '../../servicio/EmpresaServicio';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.sass'],
  providers: [EmpresaServicio]
})
export class EmpresaComponent extends ValidacionCampo implements OnInit, OnDestroy {
  empresa: Empresa = new Empresa();
  constructor(public datosServicio: DatosServicio,
              public properties: Properties,
              private notificacionServicio: NotificacionServicio,
              private empresaServicio: EmpresaServicio,
              private router: Router,
              private formBuilder: FormBuilder) {
    super();
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ruc: [null, Validators.required],
      razonSocial: [null, Validators.required],
      telefono: [null, Validators.required],
      celular: [null, Validators.required],
      direccion: [null, Validators.required],
    });
    this.empresa = new Empresa();
  }

  ngOnDestroy() {
    this.datosServicio.empresa = this.empresa;
  }

  continuar() {
    this.btnIniciarClick = true;
    if (this.form.valid) {
      this.empresaServicio.obtenerPorRuc(this.empresa.ruc)
        .then((empresa: Empresa) => {
          if (empresa === null) {
            this.router.navigate(['/registro']);
          } else {
            this.notificacionServicio.notificar('warn', this.properties.warn_empresa_existe);
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
