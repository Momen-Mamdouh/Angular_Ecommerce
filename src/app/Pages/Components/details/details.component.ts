import { Component, computed, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, signal, Signal, ViewChild } from '@angular/core';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { ICategories } from '../../../Shared/Interfaces/icategories';
import { IProduct } from '../../../Shared/Interfaces/iproduct';
import { ActivatedRoute } from '@angular/router';
import { ISpecificProduct } from '../../../Shared/Interfaces/ispecific-product';
import { environment } from '../../../Core/Environments/Environment';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ICart, ICartProduct } from '../../../Shared/Interfaces/icart';
import { CartApiService } from '../../../Core/Services/cartApi/cart-api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { ProductApiService } from '../../../Core/Services/ProductApi/product-api.service';
import { RelatedProductsComponent } from "../../../Shared/Components/related-products/related-products.component";


@Component({
  selector: 'app-details',
  imports: [DatePipe, CurrencyPipe, CommonModule, RelatedProductsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy{

    private readonly apiDataService:ApiDataService = inject(ApiDataService);
    private readonly cartApiService:CartApiService = inject(CartApiService);
    private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
    private readonly productApiService:ProductApiService = inject(ProductApiService);
    private readonly toastrService:ToastrService = inject(ToastrService);
    private readonly platformId:Object = inject(PLATFORM_ID);
    private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);
   
  activeRouteSubscription!:Subscription; 
  specficProductDataSubscription!:Subscription;
  updatedCartSubscription!:Subscription;
  loggedUserAllDataSubscription!:Subscription;
  cartDataSubscription!:Subscription;
  getAllProducts!:Subscription; 

  searchItem:string;
  dataBrandName!:string;
  detailsId!:string;
  
  subImageIndex!:number;
  ratingInInteger!:number;
  discountRangeNumber!:number;
  discountNumber!:number;
  modalCarsouel!:boolean;
  getRelatedProducts!:boolean;

  today!:Date;
  count!:Object;
  bodyData!:Object;
  
  cartData!:ICart;
  products!: IProduct[];
  categories!:ICategories[];
  dataDetails!:ISpecificProduct;
  
  
  cartProducts!:Signal<ICartProduct[]>;
  filteredProducts!:Signal<IProduct[]>;
  currentCount!:Signal<number>;;

  @ViewChild('ratingStars') ratingStars!:ElementRef;
  

  constructor(){
    this.searchItem = ``;
    this.dataBrandName = ``;
    this.detailsId = ``;
    this.subImageIndex = 0;
    this.ratingInInteger = 0;
    this.discountRangeNumber = 100;
    this.discountNumber = Math.floor(Math.random() * this.discountRangeNumber);
    this.modalCarsouel = false;
    this.getRelatedProducts = false;

    this.today = new Date();
    this.count = {};
    this.bodyData = {};
    this.dataDetails = {} as ISpecificProduct;
    this.cartData = {} as ICart
    this.products = [] as IProduct[];
    this.categories = [] as ICategories[];

    this.cartProducts = signal([] as ICartProduct[]);
    this.filteredProducts = computed(()=>this.productApiService.filteredProductsShared());
    this.currentCount =  signal(0);

  }


  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.getSpecificData();
      this.getLoggedUserCartData();
      this.cartProducts = computed(()=>this.cartApiService.productsAddedData());    
      this.filteredProducts = computed(()=>this.productApiService.filteredProductsShared());
    }
  };

  ngOnDestroy(): void {
    this.activeRouteSubscription?.unsubscribe();
    this.specficProductDataSubscription?.unsubscribe();
    this.loggedUserAllDataSubscription?.unsubscribe();
    this.updatedCartSubscription?.unsubscribe();
    this.cartDataSubscription?.unsubscribe();
    this.getAllProducts?.unsubscribe();
  }

  getSpecificData(){
    // ^^To get prodcut selcted Details as we get productId from Url.
    this.ngxSpinnerService.show();
    this.activeRouteSubscription = this.activatedRoute.paramMap.subscribe({
      next: (response)=>{
          this.detailsId = response.get("id")!; 
          this.specficProductDataSubscription =  this.apiDataService.getSpecficData(environment.specficProductEndPoint, this.detailsId).subscribe({
            next: (dataResponse)=>{    
              this.ngxSpinnerService.hide();  
              this.dataDetails = dataResponse.data;     
              this.dataBrandName = this.dataDetails.brand.name;
              this.ratingInInteger = Math.round(this.dataDetails.ratingsAverage);    
                 
            }
          })  
           
      },
      error: (error)=>{
        this.ngxSpinnerService.hide();        
      }
    });
  };

  getLoggedUserCartData(){
    // ^^To get All Cart Products Data to display from it numberofCartItems 
    // ^^and Products we already have so at deailng with cart we upload data
    this.ngxSpinnerService.show()
    this.loggedUserAllDataSubscription = this.apiDataService.getAllData(environment.getDataFromCart).subscribe({
      next:(response)=>{
        this.cartData = response.data;
        this.cartApiService.numberOfCartItems.set(response.numOfCartItems); 
        this.cartApiService.productsAddedData.set(response.data.products);
        this.getCureentProductCount();  
        this.ngxSpinnerService.hide()  ;      
      },

    }) 
  };

  getCureentProductCount(){
    this.cartProducts().forEach((cartProduct)=>{
      if(this.detailsId == cartProduct.product.id){
        this.cartApiService.detailedProductCount.set(cartProduct.count);
        this.currentCount = computed(()=>this.cartApiService.detailedProductCount())  ; 
      };
    });
  };

  
  
  updateCartProductQuantity(productId:string){
    const cartQuantityUpate = environment.changeCart +productId;
    this.ngxSpinnerService.show()
    this.updatedCartSubscription = this.apiDataService.putData(cartQuantityUpate, this.count).subscribe({
      next:(response)=>{
        this.ngxSpinnerService.hide()
        this.cartData.totalCartPrice = response.data.totalCartPrice;    
        this.cartApiService.productsAddedData.set(response.data.products);
        this.cartApiService.numberOfCartItems.set(response.numOfCartItems);
        this.getCureentProductCount();
 
      },
      error:(err)=>{
       this.ngxSpinnerService.hide()
        
      }
    }) 
  };

  plusProduct(clickedProductId:string){
    this.cartProducts().forEach((cartProduct)=>{
      if(this.detailsId == cartProduct.product.id){  
        this.cartApiService.detailedProductCount.set(cartProduct.count+1);
        this.count = {
          "count": `${this.currentCount()}`
        };
        this.updateCartProductQuantity(clickedProductId);
      }
    })


  };

  minusProduct(clickedProductId:string){
    this.cartProducts().forEach((cartProduct)=>{
      if(this.detailsId == cartProduct.product.id){
        this.cartApiService.detailedProductCount.set(cartProduct.count-1);
       
        this.count = {
          "count": `${this.currentCount()}`
        };
        this.updateCartProductQuantity(clickedProductId);
      }
    })
   
  
  };

  addToCart(productId:string){

    this.bodyData = {
      "productId": productId,
    };
    if(isPlatformBrowser(this.platformId)){
      this.ngxSpinnerService.show();
      this.cartDataSubscription = this.apiDataService.postData(environment.addProductToCart, this.bodyData ).subscribe({
        next: (response)=>{
          
            this.cartApiService.productsAddedData.set(response.data.products);
            this.cartApiService.numberOfCartItems.set(response.numOfCartItems);         
            this.getLoggedUserCartData();              
        },
        error:(error)=>{
          this.ngxSpinnerService.hide();
        }
      })
    }
   
  }

  getRelatedProductsData(relatedData:string){
      this.getRelatedProducts = true;
      this.productApiService.getRelatedProductsData(relatedData);
      this.filteredProducts = computed(()=>this.productApiService.filteredProductsShared());
  };

  showModal(imageIndex?:number):void{
    this.modalCarsouel = !this.modalCarsouel;
    this.subImageIndex = imageIndex!;
  }

  nextImage():void{
    if(this.subImageIndex == this.dataDetails.images.length -1){
      this.subImageIndex =0;
    }
    else{
      this.subImageIndex++
    }
    console.log(this.subImageIndex);

  };

  prevImage():void{
    if(this.subImageIndex == 0){
      this.subImageIndex = this.dataDetails.images.length -1;
    }
    else{
      this.subImageIndex--
    }
    console.log(this.subImageIndex);
    
  };

  getStars(rating: number): number[] {
    return new Array(Math.floor(rating)).fill(0);
  }

}
