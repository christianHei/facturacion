import {FormGroup} from '@angular/forms';

export class ValidacionCampo {

  form: FormGroup;
  public btnIniciarClick: boolean;

  isFieldValid(campo: string) {
    return (!this.form.get(campo).valid && this.form.get(campo).touched) ||
      (this.form.get(campo).untouched && this.btnIniciarClick);
  }

  displayFieldCss(campo: string) {
    return {
      'has-error': this.isFieldValid(campo),
      'has-feedback': this.isFieldValid(campo)
    };
  }
}
