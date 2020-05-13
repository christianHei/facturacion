import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidacionCampo} from '../../validacion/ValidacionCampo';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.sass']
})
export class RecuperarClaveComponent extends ValidacionCampo implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder) { super();}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  enviar() {
    this.btnIniciarClick = true;
    if (this.form.valid) {

    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
