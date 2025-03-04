import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormImageComponent } from "../../../Shared/Components/form-image/form-image.component";
import { FormHeadingComponent } from "../../../Shared/Components/form-heading/form-heading.component";
import { FormBtnComponent } from "../../../Shared/Components/form-btn/form-btn.component";
import { environment } from '../../../Core/Environments/Environment';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormModalComponent } from "../../../Shared/Components/form-modal/form-modal.component";

@Component({
  selector: 'app-contact-us',
  imports: [FormImageComponent, FormHeadingComponent, FormBtnComponent, ReactiveFormsModule, FormModalComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  private readonly contactUsSubmation:ApiDataService = inject(ApiDataService);
  private readonly contactUsNavigation:Router = inject(Router);

  contactUsForm!:FormGroup;
  contactUsSubscription!:Subscription;

  contactUsImageSrc!:string;
  contactUsImageAlt!:string;
  contactUsHeading!:string;
  contactUsSubHeading!:string;
  errorMessage!:string;
  modalHeading!:string;
  modalSubHeading!:string;
  modalButtonText!:string;
  modalRouterLink!:string;
  buttonText!:string;
  hasBackBtn!:boolean;
  successLoading!:boolean;
  isLoading!:boolean;
  showModal!:boolean;

  constructor(private formBuilder: FormBuilder){
    this.contactUsImageSrc = '/Images/contactUs.jpg';
    this.contactUsImageAlt = 'Phone';
    this.contactUsHeading = 'Contact uS';
    this.contactUsSubHeading = 'Submit your vaild Contact Data';
    this.errorMessage= '';
    this.buttonText = 'Send Data'
    this.modalHeading = `Data Send Successfully`;
    this.modalSubHeading = `We'll contact you soon :)`;
    this.modalButtonText = `Back to Login`;
    this.modalRouterLink = `/login`;
    this.hasBackBtn = false;
    this.successLoading = false;
    this.isLoading = false;
    this.showModal= false;

    this.contactUsForm = this.formBuilder.group({
      name:[null, [Validators.required, Validators.minLength(5)]],
      phone:[null, [Validators.required, Validators.pattern(/^(\+201|01|00201)[0-2, 5]{1}[0-9]{8}$/)]],
      email:[null, [Validators.required,Validators.pattern(/^\S+@\S+\.\S+$/)]],
    });
  }

  ngOnDestroy(): void {
    this.contactUsSubscription?.unsubscribe();
    
  }


   onSubmit():void{  
       if(this.contactUsForm.valid){
        this.isLoading = true;
        this.contactUsForm.reset()
        
       }
       else{
        this.contactUsForm.markAllAsTouched();
       }
        
    }

    sendContactData():void{
      this.showModal = true;
    }



}


        

