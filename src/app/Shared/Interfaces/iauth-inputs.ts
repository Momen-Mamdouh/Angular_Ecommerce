import { FormControl } from "@angular/forms";

export interface IAuthInputs{
    formName:string,
    inputName:string,
    inputText:string,
    inputId:string,
    inputType:string,
    inputPlaceholder:string,
    inputForm:string,
}

export interface IAuthImages{
    imageSrc:string,
    imageAlt:string,
}

export interface IAuthBtn{
    btnValue:string,  
}

export interface IAuthHeading{
    headingText:string,
    detailsText:string,  
}

export interface IAuthLoginForm{
    name:FormControl,
    email:FormControl,
}