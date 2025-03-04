import { Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';
import { environment } from '../../../Core/Environments/Environment';
import { FormHeadingComponent } from "../form-heading/form-heading.component";
import { FormBtnComponent } from "../form-btn/form-btn.component";
import { isPlatformBrowser } from '@angular/common';
import { IAdressessData } from '../../Interfaces/iadressess-data';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-adressess',
  imports: [ReactiveFormsModule, FormHeadingComponent, FormBtnComponent],
  templateUrl: './my-adressess.component.html',
  styleUrl: './my-adressess.component.scss'
})
export class MyAdressessComponent implements OnInit, OnDestroy{

  private readonly toastrService:ToastrService = inject(ToastrService);
  private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);
  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly platform_ID:Object = inject(PLATFORM_ID);
 



  adressessForm!:FormGroup;
  putAderressSubscription!:Subscription;
  getAderressDataSubscription!:Subscription;
  deleteAderressSubscription!:Subscription;

  adressessHeading!:string;
  adressessSubHeading!:string;
  buttonText!:string;
  errorMessage!:string;
  productId!:string;

  hasBackBtn!:boolean;
  isLoading!:boolean;
  editAdressesValue!:boolean;
  showFileName!: boolean;
  showPopUpAlert!:boolean;
  profileImage!:WritableSignal<string | null>;
  addressesData!:WritableSignal<IAdressessData[]>;
  

  @ViewChild('fileInput') fileInput!:ElementRef<HTMLInputElement>

  constructor(private formBuilder: FormBuilder){
    this.adressessForm = this.formBuilder.group({
      name:['', Validators.required],
      details:['', Validators.required],
      phone:['', Validators.pattern(/^01[0125]\d{8}$/)],
      city:['',Validators.required],
    });

    this.adressessHeading = ``;
    this.adressessSubHeading = ``;
    this.buttonText = 'Add Adresses';
    this.errorMessage = ``;
    this.productId = ``;

    this.hasBackBtn = false;
    this.isLoading = false;
    this.editAdressesValue = false;
    this.showFileName = false;
    this.showPopUpAlert = false;

    this.profileImage = signal(localStorage.getItem('profileImage'));
    this.addressesData = signal([] as IAdressessData[]);
    
   
  };

  ngOnInit(): void {
      if(isPlatformBrowser(this.platform_ID)){
          this.getAddressesData();
      };
  }   

  ngOnDestroy(): void {
    this.putAderressSubscription?.unsubscribe();
    this.getAderressDataSubscription?.unsubscribe();
    this.deleteAderressSubscription?.unsubscribe();
  }

  getAddressesData():void{
    this.ngxSpinnerService.show();
    this.getAderressDataSubscription = this.apiDataService.getAllData(environment.addAdressess).subscribe({
      next:(response)=>{
        this.isLoading = false;
        this.showSuccess();
        this.addressesData.set(response.data);
        this.ngxSpinnerService.hide();
        console.log(response.data);
        
      },
      error:(error)=>{
          this.showError(error)
          this.errorMessage = error.message;
          this.isLoading = false;
          this.ngxSpinnerService.hide();
      }
    })
  } 
  

  addAddressesData(): void {
    if (this.adressessForm.valid) {
     
      this.addressesData().forEach((dataItem)=>{
          if(dataItem.phone == this.adressessForm.value.phone){
            this.ngxSpinnerService.hide();
              this.showPopUpAlert = true
          }
          else{
            this.showPopUpAlert = false
          }
      
          
      });

      if(!this.showPopUpAlert){
        this.ngxSpinnerService.show();
          this.showSuccess(); 
          this.isLoading = true;
          this.putAderressSubscription = this.apiDataService.postData(environment.addAdressess, this.adressessForm.value).subscribe({
            next:(response)=>{
              this.isLoading = false;
              this.showSuccess();
              this.editAdressesValue = false;
              this.showPopUpAlert = false;
              this.addressesData.set(response.data);
              this.ngxSpinnerService.hide();
            },
            error:(error)=>{
              this.ngxSpinnerService.hide();
                this.showError(error)
                this.errorMessage = error.message;
                this.isLoading = false;
                this.ngxSpinnerService.hide();
            }
          })
      }
       
    } 
    else {
      this.adressessForm.markAllAsTouched();
    };
  }

  removeAddress(productId:string): void {
    
    this.ngxSpinnerService.show();
    this.deleteAderressSubscription = this.apiDataService.deleteData(environment.addAdressess+productId).subscribe({
      next:(response)=>{
        
        this.addressesData.set(response.data);
        this.isLoading = false;
        this.showSuccess();
        this.ngxSpinnerService.hide();
      },
      error:(error)=>{
          this.showError(error)
          this.errorMessage = error.message;
          this.isLoading = false;
          this.ngxSpinnerService.hide();
      }
    })
} 
  
  showSuccess() {
    this.toastrService.success("Your Adress is added Successfully","Vaild Address Data");
  };
  
  showError(errorMessage?:string) {
    this.toastrService.error(errorMessage, "Your Address isn't vaild",);
  };

  editAdresses():void{
    this.editAdressesValue = true;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; 

      const reader = new FileReader();
     
      reader.onload = () => this.profileImage.set(reader.result as string);
      this.profileImage.set(localStorage.getItem('profileImage'));
      reader.readAsDataURL(file);
    }
  }

}



