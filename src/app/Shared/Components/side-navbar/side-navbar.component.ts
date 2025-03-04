import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, PLATFORM_ID, Signal, InputSignal, input } from '@angular/core';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { environment } from '../../../Core/Environments/Environment';
import { Subscription } from 'rxjs';
import { WishListService } from '../../../Core/Services/wishListApi/wish-list.service';
import { ISideNavbar } from '../../Interfaces/side-navbar';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-side-navbar',
  imports: [RouterLink],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent implements OnInit, OnDestroy {

  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly wishListService:WishListService = inject(WishListService);
  private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);
  private readonly platformId:Object = inject(PLATFORM_ID);


  wishListUserData!:Subscription;

  token!:string; 
  isLogin:boolean = this.defineNavbarBtns();
  showMSideMenu!:boolean;  

  numberOfWishListItems!:Signal<number>;
  sideNavbarLinks:InputSignal<ISideNavbar[]> = input([] as ISideNavbar[]);
  
  
  constructor(){
    this.showMSideMenu = false;
  }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.ngxSpinnerService.show();
      this.getLoggedWishListData();
      this.numberOfWishListItems = computed(()=>this.wishListService.numberOfWishListItems());
      this.ngxSpinnerService.hide();
    }
    
  }

  ngOnDestroy(): void {
      this.wishListUserData?.unsubscribe();
  }


  getLoggedWishListData():void{
    this.ngxSpinnerService.show();
    this.wishListUserData = this.apiDataService.getAllData(environment.getUserWishList).subscribe({
        next:(response)=>{    
          this.wishListService.numberOfWishListItems.set(response.count); 
          this.ngxSpinnerService.hide();       
        },
        error:(error)=>{
          console.log(error.message);
          this.ngxSpinnerService.hide();
          
        }
      }) 

  };

  defineNavbarBtns():boolean {
    if(isPlatformBrowser(this.platformId)){
      this.token = localStorage.getItem('loginToken')!;
          if(this.token !=null) {
            return true
          } 
          else{
            return false
          }    
    }
    else{
      return false
    }   
  };
    
  logOut():void{
    this.apiDataService.logOut();
   }

   toggleMenu() {
      this.showMSideMenu = !this.showMSideMenu;
  }

}
