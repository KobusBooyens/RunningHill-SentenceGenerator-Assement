import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { IConfigFile, IConstructedSentences, IWordRepository } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { }

  errorMessage: string = "";

  postConstructedSentence(sentence: string) : Observable<any>{
    let url: string = `${this.appConfigService.baseUrlToUse}` + `api/Process/AddConstructedSentence`;

    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(url, JSON.stringify(sentence), {headers: headers});
  }

  getWordRepository(): Observable<IWordRepository[]>{
  
    let url: string = `${this.appConfigService.baseUrlToUse}` + `api/Process/GetWordTypeRepositories`;

    return this.http.get<IWordRepository[]>(url)
    .pipe(
      //commented out for debugging purposes
      //tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
      );
  }

  getConstructedSentences(): Observable<IConstructedSentences[]>{
    let url: string = `${this.appConfigService.baseUrlToUse}` + `api/Process/GetAllConstructedSentences`;

    return this.http.get<IConstructedSentences[]>(url)
    .pipe(
      //commented out for debugging purposes
      //tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
      );
  }

  private handleError(err : HttpErrorResponse)
  {
      let errorMessage = '';
      if(err.error instanceof ErrorEvent)
      {
          errorMessage = `An error occurred: ${err.error.message}`;
      }
      else
      {
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(() => errorMessage);
  }
}
