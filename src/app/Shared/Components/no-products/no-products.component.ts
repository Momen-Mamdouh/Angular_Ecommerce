import { Component, input, InputSignal, } from '@angular/core';


@Component({
  selector: 'app-no-products',
  imports: [],
  templateUrl: './no-products.component.html',
  styleUrl: './no-products.component.scss'
})
export class NoProductsComponent {

  emptyImageSrc = input<string>('');
  emptyImageAlt = input<string>('');
  emptyHeading = input<string>('');
  emptyParagraph = input<string>('');



}
