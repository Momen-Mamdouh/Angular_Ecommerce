import { Component, input, InputSignal } from '@angular/core';



@Component({
  selector: 'app-form-heading',
  imports: [],
  templateUrl: './form-heading.component.html',
  styleUrl: './form-heading.component.scss'
})
export class FormHeadingComponent {

  

  notLogin:InputSignal<boolean> = input<boolean>(false);
  headingText:InputSignal<string> = input<string>('');
  subHeadingText:InputSignal<string> = input<string>('');

  constructor(){
  }


}
