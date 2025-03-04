import { Component, computed, inject, input, InputSignal, PLATFORM_ID, signal, Signal } from '@angular/core';


import { ICategories } from '../../../Shared/Interfaces/icategories';
import { IProduct } from '../../../Shared/Interfaces/iproduct';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../Shared/Pipes/searchPipe/search.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../Core/Environments/Environment';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartApiService } from '../../../Core/Services/cartApi/cart-api.service';
import { NoProductsComponent } from "../../../Shared/Components/no-products/no-products.component";
import { ICard } from '../../../Shared/Interfaces/card';
import { WishListService } from '../../../Core/Services/wishListApi/wish-list.service';
import { ProductApiService } from '../../../Core/Services/ProductApi/product-api.service';




@Component({
  selector: 'app-products',
  imports: [FormsModule, SearchPipe, RouterLink, CurrencyPipe, NoProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

    private readonly APIDataService:ApiDataService = inject(ApiDataService);
    private readonly platformId:Object = inject(PLATFORM_ID);
    private readonly toastrService:ToastrService = inject(ToastrService);
    private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);
    private readonly cartApiService:CartApiService = inject(CartApiService);
    private readonly productApiService:ProductApiService = inject(ProductApiService);
    private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
    private readonly wishList:WishListService = inject(WishListService);

  getAllProductsSubscription!:Subscription;
  getCategoriesSubscription!:Subscription;
  cartDataSubscription!:Subscription;
  loggedUserAllDataSubscription!:Subscription;
  activeRoutingSubscription!:Subscription;
  wishListDataSubscription!:Subscription;

  searchItem!:string;
  noProductsImageSrc!:string;
  noProductsImageAlt!:string;
  activeRoute!:string;
  bodyData!:Object;
  noProductsData!:ICard;
  products!: IProduct[];
  categories!:ICategories[];

  filteredProducts!:Signal<IProduct[]>;
  wishListAllData!:Signal<IProduct[]>;
  startSlicing:InputSignal<number> = input<number>(0);
  endSlicing:InputSignal<number> = input<number>(0);
  productId:InputSignal<string> = input('');
 
  


  constructor(){
    this.searchItem = ``;
    this.products = [];
    this.filteredProducts = computed(()=>this.productApiService.filteredProductsShared());
    this.categories = [];
    this.bodyData = {};
    this.activeRoute='';
    this.noProductsData = {
      cardImageSrc:'/Images/noProducts.jpg',
      cardImageAlt:'Empty Cart',
      cardRouterLink:'string',
      cardText:"You're Welcome this section will be Provided Soon. Go ahead & explore top categories.",
      cardHeading:"Now we've Men & Women Clothes Only",
    };
    this.wishListAllData = computed(()=>this.wishList.wishListData());
  }

    ngOnInit(): void {
      this.getRoute();
      this.getProductsData();
      this.getCategoriesData(); 
      this.getLoggedUserCartData();

    };

    ngOnDestroy(): void {
      this.getAllProductsSubscription?.unsubscribe();
      this.getCategoriesSubscription?.unsubscribe();
      this.cartDataSubscription?.unsubscribe();
      this.loggedUserAllDataSubscription?.unsubscribe();
      this.activeRoutingSubscription?.unsubscribe(); 
      this.wishListDataSubscription?.unsubscribe(); 
      
    }

    getRoute():void{
      this.activeRoutingSubscription = this.activatedRoute.paramMap.subscribe({
       next:(shopCategory)=>{
         this.activeRoute = shopCategory.get('shopCategory')!;  
          this.getProductsData();
         
       },
       error: (error)=>{
         this.showError(error.message);
         
       }
     })
    }
   

    getProductsData(){
      if(isPlatformBrowser(this.platformId)){ 
        this.ngxSpinnerService.show()   
        this.getAllProductsSubscription = this.APIDataService.getAllData(environment.allProductsDataEndPoint).subscribe({
          next: (response)=>{
              this.products = response.data;  
              this.filteredProducts = computed(() =>
                this.products.filter((product) => product.category.name === this.activeRoute)
              );  
              this.productApiService.filteredProductsShared.set(this.filteredProducts()) 
              this.filteredProducts = computed(()=>this.productApiService.filteredProductsShared());
              this.ngxSpinnerService.hide()  
          },
          error:()=>{
            this.ngxSpinnerService.hide() 
          },
  
        });
      }
    };


    getCategoriesData(){
   
      if(isPlatformBrowser(this.platformId)){    
        this.getCategoriesSubscription = this.APIDataService.getAllData(environment.allProductsEndPoint).subscribe({
          next: (response)=>{
              this.categories = response.data; 
              this.ngxSpinnerService.hide()                       
          },
          error:(error)=>{
            this.showError(error.message);
            this.ngxSpinnerService.hide()       
          },

          });
      }
    };

    getLoggedUserCartData(){
      this.ngxSpinnerService.show();
      this.loggedUserAllDataSubscription =  this.APIDataService.getAllData( environment.getDataFromCart).subscribe({
          next:(response)=>{
            this.cartApiService.productsAddedData.set(response.data.products); 
            this.ngxSpinnerService.hide()                   
          }
      }) 
    }

    addToCart(productId:string){
      this.ngxSpinnerService.show();
      this.bodyData = {
        "productId": productId,
      };

      if(isPlatformBrowser(this.platformId)){
        this.cartDataSubscription = this.APIDataService.postData( environment.addProductToCart, this.bodyData).subscribe({
          next: (response)=>{
              this.showSuccess();
              this.cartApiService.numberOfCartItems.set(response.numOfCartItems);
              this.cartApiService.productsAddedData.set(response.data.products);  
              this.getLoggedUserCartData(); 
              this.ngxSpinnerService.hide()               
          },
          error:(error)=>{
            this.showError(error.message);
            this.ngxSpinnerService.hide()  
          }
        })
      }
        
    }

    addToWishLsit(productId:string){
      this.bodyData = {
        "productId": productId,
      };

      if(isPlatformBrowser(this.platformId)){
        this.wishListDataSubscription = this.APIDataService.postData(environment.getUserWishList, this.bodyData).subscribe({
          next: (response)=>{
              this.showSuccess();
              this.wishList.numberOfWishListItems.set(response.data.length); 
              this.wishList.getLoggedUserWishList();
          },
          error:(error)=>{
            this.showError(error.message) 
          }
        })
      }
        
    }

    showSuccess() {
      this.toastrService.success("You're Welcomed", 'Product added Successfully !',);
    };
    
    showError(errorMessage:string) {
      this.toastrService.error(errorMessage, "Product isn't added :(",);
    };

    



}
