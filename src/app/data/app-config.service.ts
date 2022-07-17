import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IConfigFile } from './models';

@Injectable({
  providedIn: 'root'
})


export class AppConfigService {

  baseUrlToUse: string = "";

  constructor(private http: HttpClient) { }

  getAppConfig() : Observable<IConfigFile>{
  return this.http.get<IConfigFile>("/assets/config.json").pipe(
    tap(data => {
      this.baseUrlToUse = data.apiBaseUrl;
      //console.log("base url:" + this.baseUrlToUse)
    }));
  }
}
