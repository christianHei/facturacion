import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-campo',
  templateUrl: './error-campo.component.html',
  styleUrls: ['./error-campo.component.sass']
})
export class ErrorCampoComponent {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
}
