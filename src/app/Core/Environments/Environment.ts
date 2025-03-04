import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';


export const environment = {
    baseUrl : `https://ecommerce.routemisr.com`,
    localHost:`url=http://localhost:4200`,
    allProductsEndPoint:`/api/v1/categories`,
    specficProductEndPoint: `/api/v1/products/`,
    signUpEndPoint:`/api/v1/auth/signup`,
    signInEndPoint:`/api/v1/auth/signin`,
    forgetPasswordEndPoint:`/api/v1/auth/forgotPasswords`,
    verifyResetCodeEndPoint:`/api/v1/auth/verifyResetCode`,
    resetPasswordEndPoint: `/api/v1/auth/resetPassword`,
    allProductsDataEndPoint:`/api/v1/products`,
    addProductToCart: `/api/v1/cart`,
    getDataFromCart:`/api/v1/cart`,
    changeCart:`/api/v1/cart/`,
    deliverCharge: 5,
    allUserOrders:`/api/v1/user/`,
    checkOutSession:`/api/v1/orders/checkout-session/`,
    cashOrder:`/api/v1/orders/`,
    brandsEndPoint: `/api/v1/brands`,
    getUserWishList:`/api/v1/wishlist/`,
    addAdressess: `/api/v1/addresses/`,
    

    lightLogo : '/Images/MainLogo/lightScale_Transparent.png',
    darkLogo : '/Images/MainLogo/darkScale_Transparent.png',
    lightLogoNavbar : '/Images/MainLogo/lightScale_Transparent.png',
    logoAlt : 'M Logo',
    brandIcons : [
        {
          iconName:'FaceBook',
          icon: faFacebookF,
          siteLink: 'www.http://facebook.com',
        },
  
        {
          iconName:'Instgram',
          icon: faInstagram,
          siteLink: 'www.http://x.com',
        },
  
        {
          iconName:'X',
          icon: faXTwitter,
          siteLink: 'www.http://instgram.com',
        },
      ]
  
}









    