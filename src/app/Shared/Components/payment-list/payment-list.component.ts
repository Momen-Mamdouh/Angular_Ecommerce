import { CurrencyPipe } from '@angular/common';
import { Component, Input, InputSignal, input } from '@angular/core';
import { ICart } from '../../Interfaces/icart';

@Component({
  selector: 'app-payment-list',
  imports: [CurrencyPipe],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent {

  cartData:InputSignal<ICart> = input<ICart>({} as ICart)
  deliveryCharge:InputSignal<number> = input<number>(0)

}
