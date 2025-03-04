import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './Core/Services/FlowBite/flow-bite.service';
import { NgxSpinnerComponent } from 'ngx-spinner';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eCommerce';

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      //^^ Your custom code here
    });
}
}