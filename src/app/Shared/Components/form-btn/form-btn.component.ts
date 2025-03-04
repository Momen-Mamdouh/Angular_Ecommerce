import { Component, input, Input, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-btn',
  imports: [],
  templateUrl: './form-btn.component.html',
  styleUrl: './form-btn.component.scss'
})
export class FormBtnComponent {


  @Input() form!:FormGroup;
  isLoading:InputSignal<boolean> = input<boolean>(false);
  errorMessage:InputSignal<string> = input<string>('');
  btnText:InputSignal<string> = input<string>('');



}
