import { Component, input, Input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-form-image',
  imports: [],
  templateUrl: './form-image.component.html',
  styleUrl: './form-image.component.scss'
})
export class FormImageComponent {


  formImageSrc:InputSignal<string> = input<string>('');
  formImageAlt:InputSignal<string> = input<string>('');

}
