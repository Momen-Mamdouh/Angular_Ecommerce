import { Component, inject} from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { CategoriesSliderComponent } from "../../../Shared/Components/categories-slider/categories-slider.component";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-shop',
  imports: [ProductsComponent, CategoriesSliderComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly toastrService:ToastrService = inject(ToastrService);

  
  activeRoutingSubscription!:Subscription;
  activeRoute!:string;

  
  constructor(){
    this.activeRoute='';

  }

  ngOnInit(): void {
    this.getRoute();
  }

  ngOnDestroy(): void {
    this.activeRoutingSubscription?.unsubscribe();   
  }


  getRoute():void{
    this.activeRoutingSubscription = this.activatedRoute.paramMap.subscribe({
     next:(shopCategory)=>{
       this.activeRoute = shopCategory.get('shopCategory')!;   
     },
     error: (error)=>{
       this.showError(error.message);
       
     }
   })
  }


  showSuccess() {
    this.toastrService.success("You're Welcomed", 'Product added Successfully !',);
  };
  
  showError(errorMessage:string) {
    this.toastrService.error(errorMessage, "Product isn't added :(",);
  };
}








