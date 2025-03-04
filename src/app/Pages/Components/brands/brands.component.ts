import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { environment } from '../../../Core/Environments/Environment';
import { IAllBrands } from '../../../Shared/Interfaces/iall-brands';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrandsSearchPipe } from '../../../Shared/Pipes/searchPipe/brandsSearchPipe/brands-search.pipe';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  imports: [BrandsSearchPipe, RouterLink, FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy {

  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService)
  private readonly plarformId:Object = inject(PLATFORM_ID);

  allBrandsSubscription!:Subscription;
  searchItem!:string;
  allBrandsData!:IAllBrands[];

  constructor(){
    this.searchItem  = ``;
    this.allBrandsData = [] as IAllBrands[];
  }

  ngOnInit(): void {
    if(isPlatformBrowser(this.plarformId)){
        this.getAllBrands();
    }
    
  }

  ngOnDestroy(): void {
    this.allBrandsSubscription?.unsubscribe();
  }

  getAllBrands():void{
    this.ngxSpinnerService.show();
    this.apiDataService.getAllData(environment.brandsEndPoint).subscribe({
         next:(response)=>{
          this.ngxSpinnerService.hide();
          this.allBrandsData = response.data;
      },
      error:(error)=>{
        this.ngxSpinnerService.hide();
      }
    })
  }

}
