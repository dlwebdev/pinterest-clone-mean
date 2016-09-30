// AuthService.js
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {
  private userApiUrl = '/api/user/';  // URL to web api      
  
  
  constructor(private http: Http) {}


  getCurrentUser(): Promise<Object[]> {
    return this.http.get(this.userApiUrl + 'current-user')
               .toPromise()
               .then(response => response.json() as Object[])
               .catch(this.handleError);
  }
  
  getUserAuthStatus(): Observable<Object[]> {
    return this.http.get(this.userApiUrl + 'authenticated')
               .toPromise()
               .then(response => response.json() as Object[])
               .catch(this.handleError);                    
  }  

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  } 

}