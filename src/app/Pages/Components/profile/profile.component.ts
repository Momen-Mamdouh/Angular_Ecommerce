import { Component, inject, input, InputSignal, PLATFORM_ID } from '@angular/core';
import { ISideNavbar } from '../../../Shared/Interfaces/side-navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {



  sideNavbarLinks:InputSignal<ISideNavbar[]> = input([
    
    {
      linkText:'My Profile',
      linkIcon:'fas fa-chart-pie',
      routerLink:'/profile/myProfile',

    },

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
;

  constructor(){
    

}

}