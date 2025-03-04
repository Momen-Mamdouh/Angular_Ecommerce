import { IconDefinition } from "@fortawesome/angular-fontawesome";

 
export interface IProfileData {
    dataName: string,
    dataValue: string,
    dataIcon:IconDefinition,

}

export interface IProfileLinks {

    routedLinkPath:string,
    routedLinkName: string,
    routedLinkClasses:string,
}

export interface IPayments {
    imgSrc:string,
    imgAlt: string,
}


