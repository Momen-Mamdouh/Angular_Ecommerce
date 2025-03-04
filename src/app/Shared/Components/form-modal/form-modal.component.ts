import { Component, ElementRef, input, Input, InputSignal, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-modal',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent {



  headingText:InputSignal<string> = input<string>('');
  subHeadingText:InputSignal<string> = input<string>('');
  buttonText:InputSignal<string> = input<string>('');
  roterLink:InputSignal<string> = input<string>('');

  @ViewChild('FormModal') formModal!:ElementRef;

  checkMark!:IconDefinition;
  closeMark!:IconDefinition;

  constructor(private renderer2:Renderer2){
    this.checkMark = faCheck;
    this.closeMark = faClose;
  }



  closeModal(){
    this.renderer2.removeClass(this.formModal.nativeElement, "flex");
    this.renderer2.addClass(this.formModal.nativeElement, "hidden");
  }
}
