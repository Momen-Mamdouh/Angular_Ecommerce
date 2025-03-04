import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IAuthInputs } from '../../../Shared/Interfaces/iauth-inputs';
import { ApiDataService } from '../../Services/Api/api-data.service';
import { LoaderComponent } from "../../../Shared/Components/loader/loader.component";
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../Environments/Environment';
import { FormImageComponent } from "../../../Shared/Components/form-image/form-image.component";
import { FormHeadingComponent } from "../../../Shared/Components/form-heading/form-heading.component";
import { FormBtnComponent } from "../../../Shared/Components/form-btn/form-btn.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, LoaderComponent, FormImageComponent, FormHeadingComponent, FormBtnComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {
    private readonly registerSubmation:ApiDataService = inject(ApiDataService);
    private readonly registerNavigation:Router = inject(Router);

    registerSubscription!:Subscription;

    registerHeading!:string;
    registerSubHeading!:string;
    registerImageSrc!:string;
    registerImageAlt!:string;
    buttonText!:string;
    errorMessage!:string;
  
    isLoading!:boolean;
    hasBackBtn!:boolean;
    successLoading!:boolean;

    registerFormData!:IAuthInputs[];


  constructor(){
    this.registerHeading = 'Create New Account';
    this.registerSubHeading = 'Please enter details';
    this.registerImageSrc = `/Images/Auth/Register_Image.jpg`;
    this.registerImageAlt = `register`;
    this.buttonText = "Sign Up";
    this.errorMessage = '';
    this.isLoading = false;
    this.hasBackBtn = true;

    this.registerFormData = [] as IAuthInputs[];

  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe()
  }


  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{2,20}$/)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z]\w{8,}$/)]),
    rePassword: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)]),
  }, {validators: this.confrimPassword});


  onSubmit():void{  
     if(this.registerForm.valid){
      this.isLoading = true;
      this.registerSubscription =  this.registerSubmation.postData(environment.signUpEndPoint, this.registerForm.value).subscribe({
        next:(response)=>{
          if(response.message === 'success'){ 
            this.registerNavigation.navigate(['/login'])
          }
        },
        error:(error:HttpErrorResponse)=>{
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },

      });
     }
     else{
      this.registerForm.markAllAsTouched();
     }
      
  }

  confrimPassword(group:AbstractControl){
     const passwordValue =  group.get('password')?.value;
     const rePasswordValue =  group.get('rePassword')?.value;
     return passwordValue === rePasswordValue? null : {mismatch:true};
  }

}
