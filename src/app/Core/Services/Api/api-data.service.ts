import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/Environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  baseUrl = environment.baseUrl
  private readonly httpClient:HttpClient = inject(HttpClient);
  private readonly router:Router = inject(Router);
  endURL!:string;
  userData!:any;



    getAllData(endPoint:string, headers?:Object):Observable<any>{
        this.endURL = this.baseUrl + endPoint;
        return this.httpClient.get(this.endURL, headers);
      };
    
    getSpecficData(endPoint:string, id:string):Observable<any>{
        this.endURL = this.baseUrl + `${endPoint}${id}`;
        return this.httpClient.get(this.endURL)
    };

    postData(endPoint:string, data:Object, headers?:Object):Observable<any>{
      this.endURL = this.baseUrl + endPoint;
      return this.httpClient.post(this.endURL, data, headers)
    };
    
    putData(endPoint:string, data:Object, headers?:Object):Observable<any>{
      this.endURL = this.baseUrl + endPoint;
      return this.httpClient.put(this.endURL, data, headers)
    };

    deleteData(endPoint:string, headers?:Object):Observable<any>{
      this.endURL = this.baseUrl + endPoint;
      return this.httpClient.delete(this.endURL, headers)
    };

    clearData(endPoint:string, headers?:Object):Observable<any>{
      this.endURL = this.baseUrl + endPoint;
      return this.httpClient.delete(this.endURL, headers)
    };

    getUserDataFromLoggedToken(){
      this.userData = jwtDecode(localStorage.getItem('loginToken')!);
    };


    logOut(){
      localStorage.removeItem('loginToken');
      this.userData = null ;
      this.router.navigate(['/login']);  
    };



  }



  // signIn(endPoint:string, data:Object):Observable<any>{
  //   this.endURL = this.baseUrl + endPoint;
  //   return this.httpClient.post(this.endURL, data)
  // };

  // forgetPassword(endPoint:string, data:Object):Observable<any>{
  //   this.endURL = this.baseUrl + endPoint;
  //   return this.httpClient.post(this.endURL, data)
  // };

  // verifyResetCode(endPoint:string, data:Object):Observable<any>{
  //     this.endURL = this.baseUrl + endPoint;
  //     return this.httpClient.post(this.endURL, data)
  // };



