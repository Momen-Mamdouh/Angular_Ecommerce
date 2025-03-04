import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  baseApiUrl!:string;

  constructor(private httpClient:HttpClient) { 
    this.baseApiUrl= "https://file.io";
  }

  upload(file:any):Observable<any> {
    const formData = new FormData(); 

    formData.append("file", file, file.name);

    return this.httpClient.post(this.baseApiUrl, formData)
}

}
