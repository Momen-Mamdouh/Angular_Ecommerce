import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProfileData, IProfileLinks, IPayments } from "../../Interfaces/footer-data";
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faPhoneVolume, faEnvelope, faLocationDot, faRightLong} from "../../../../../node_modules/@fortawesome/free-solid-svg-icons";
import { environment } from '../../../Core/Environments/Environment';


@Component({
  selector: 'app-footer',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  envelopeIcon:IconDefinition = faEnvelope;
  arrowRtIcon:IconDefinition = faRightLong;
  environmentData = environment;

  profileData:IProfileData[];
  profileInfoLinks: IProfileLinks[];
  profileServiecLinks: IProfileLinks[];
  payments: IPayments[];

 constructor(){

  this.profileData = [
    {
      dataName: 'PhoneNumber',
      dataValue: '(+20) 1146459858',
      dataIcon: faPhoneVolume,
    },

    {
      dataName:'Email',
      dataValue:'M_Fashion',
      dataIcon: faEnvelope,

    },

    {
      dataName:'Address',
      dataValue:'Maddi 9,Street',
      dataIcon: faLocationDot,

    },
  ];
  this.profileInfoLinks = [
    {
      routedLinkPath:'profile',
      routedLinkName: 'My Account',
      routedLinkClasses:'string',
    },

    {
      routedLinkPath:'lgoin',
      routedLinkName: 'Login',
      routedLinkClasses:'string',
    },
    
    {
      routedLinkPath:'123',
      routedLinkName: 'My Cart',
      routedLinkClasses:'string',
    },

    {
      routedLinkPath:'123',
      routedLinkName: 'My Whishlist',
      routedLinkClasses:'string',
    },

    {
      routedLinkPath:'checkOut',
      routedLinkName: 'CheckOut',
      routedLinkClasses:'string',
    },
  ]
  this.profileServiecLinks = [
    {
      routedLinkPath:'123',
      routedLinkName: 'About Us',
      routedLinkClasses:'string',
    },

    {
      routedLinkPath:'123',
      routedLinkName: 'Careers',
      routedLinkClasses:'string',
    },

    {
      routedLinkPath:'123',
      routedLinkName: 'Delivery Info',
      routedLinkClasses:'string',
    },

    {
      routedLinkPath:'123',
      routedLinkName: 'Privacy Policy',
      routedLinkClasses:'string',
    },

    {
      routedLinkPath:'123',
      routedLinkName: 'Terms & Conditions ',
      routedLinkClasses:'string',
    },
  ]
  this.payments = [
      {
        imgSrc:'/Images/Payment_Logos/amazon-pay.png',
        imgAlt:'Amazon Pay logo',
        
      },

      {
        imgSrc:'/Images/Payment_Logos/American-Express-Color.png',
        imgAlt:'American Express pay logo',
        
      },

      {
        imgSrc:'/Images/Payment_Logos/paypal.png',
        imgAlt:'Paypal pay logo',
        
      },

      {
        imgSrc:'/Images/Payment_Logos/mastercard.webp',
        imgAlt:'MasterCard pay logo',
        
      },


  ];
   
 }

}

