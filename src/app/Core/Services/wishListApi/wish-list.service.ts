import { inject, Injectable, OnInit, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { ApiDataService } from '../Api/api-data.service';
import { environment } from '../../Environments/Environment';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../../Shared/Interfaces/iproduct';


@Injectable({
  providedIn: 'root'
})
export class WishListService implements OnInit{

  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly platformId:Object = inject(PLATFORM_ID);
  private readonly toastrService:ToastrService = inject(ToastrService);


  numberOfWishListItems!:WritableSignal<number>;
  wishListData!:WritableSignal<IProduct[]>;
  detailedProductCount!:WritableSignal<number>;

  removeEndPoint!:string;

  constructor() { 
    this.numberOfWishListItems = signal(0);
    this.wishListData = signal([] as IProduct[])
  }


  ngOnInit(): void {
      if(isPlatformBrowser(this.platformId)){
          this.getLoggedUserWishList();
      } 
  }

  getLoggedUserWishList():void{
      this.apiDataService.getAllData(environment.getUserWishList).subscribe({
        next:(response)=>{
          this.wishListData.set(response.data);  
        }
      })
  };

  addProductToWishList(productId:Object):void{
      this.apiDataService.postData(environment.getUserWishList, productId).subscribe({
        next:(response)=>{
          console.log(response);
          this.showSuccess();
        },
        error:(error)=>{
          this.showError(error.message);
        },

  });


  };
  
 


  showSuccess(){
    this.toastrService.success("You're Welcomed", 'Product added Successfully to WishList !',);
  };
  
  showError(errorMessage:string) {
    this.toastrService.error(errorMessage, "Product isn't added :(",);
  };


  

}