import { Component,  input, InputSignal, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../../../Shared/Components/footer/footer.component";
import { Subscription } from 'rxjs';
import { SideNavbarComponent } from "../../../Shared/Components/side-navbar/side-navbar.component";
import { ISideNavbar } from '../../../Shared/Interfaces/side-navbar';



@Component({
  selector: 'app-main-lay-out',
  imports: [RouterOutlet, NavBarComponent, FooterComponent, SideNavbarComponent],
  templateUrl: './main-lay-out.component.html',
  styleUrl: './main-lay-out.component.scss',
   
  
})
export class MainLayOutComponent implements OnInit {
  
  CurrentRoute!:string;
  getRoute!:Subscription;

  sideNavbarLinks:InputSignal<ISideNavbar[]> = input([
      
  
      {
        linkText:'My WishList',
        linkIcon:'fas fa-dolly',
        routerLink:'/profile/wishlist',
      },
  
      {
        linkText:'My Cart',
        linkIcon:'fas fa-chart-pie',
        routerLink:'/cart',
      },
  
      {
        linkText:'Manage Addresses',
        linkIcon:'fas fa-chart-pie',
        routerLink:'/profile/addresses',
      },
  
    ])

  constructor(){
  }
  ngOnInit(): void {
  };




  





}
