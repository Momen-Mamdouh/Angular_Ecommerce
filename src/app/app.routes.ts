import { Routes } from '@angular/router';
import { loginGuard } from './Core/Guards/authLogin/login.guard';
import { loggedInGuard } from './Core/Guards/authLogged/logged-in.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    loadComponent: () =>
      import('./Layouts/Components/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    canActivate: [loggedInGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./Core/Components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./Core/Components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./Core/Components/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent
          ),
        title: 'Forget Password',
      },
      {
        path: 'checkOTP',
        loadComponent: () =>
          import('./Core/Components/check-otp/check-otp.component').then(
            (m) => m.CheckOTPComponent
          ),
        title: 'Check OTP',
      },
      {
        path: 'changePassword',
        loadComponent: () =>
          import('./Core/Components/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent
          ),
        title: 'New Password',
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./Layouts/Components/main-lay-out/main-lay-out.component').then(
        (m) => m.MainLayOutComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./Pages/Components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home',
        canActivate: [loginGuard],
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./Pages/Components/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'Details',
      },
      {
        path: 'checkOut/:cartId',
        loadComponent: () =>
          import('./Pages/Components/check-out/check-out.component').then(
            (m) => m.CheckOutComponent
          ),
        title: 'Check Out',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./Pages/Components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./Pages/Components/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
        title: 'Payment',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./Pages/Components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'shop/:shopCategory',
        loadComponent: () =>
          import('./Pages/Components/shop/shop.component').then(
            (m) => m.ShopComponent
          ),
        title: 'Shop',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./Pages/Components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'Cart',
      },
      {
        path: 'contactUs',
        loadComponent: () =>
          import('./Pages/Components/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent
          ),
        title: 'Contact Us',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./Pages/Components/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        title: 'Profile',
        children: [
          {
            path: 'wishlist',
            loadComponent: () =>
              import('./Shared/Components/wish-list/wish-list.component').then(
                (m) => m.WishlistComponent
              ),
            title: 'Wish List',
          },
          {
            path: 'addresses',
            loadComponent: () =>
              import('./Shared/Components/my-adressess/my-adressess.component').then(
                (m) => m.MyAdressessComponent
              ),
            title: 'My Addresses',
          },
        ],
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./Pages/Components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Error',
  },
];
