// ImagesService.js
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ImagesService {
  private imagesApiUrl = '/api/images/';     
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) {}


  getAllImages(): Promise<Object[]> {
    return this.http.get(this.imagesApiUrl)
               .toPromise()
               .then(response => response.json() as Object[])
               .catch(this.handleError);
  }
  
  getUsersImages(): Promise<Object[]> {
    console.log("Image service here. Passing along user id for images to retrieve: ");
    
    return this.http.get(this.imagesApiUrl + 'currentuser/')
               .toPromise()
               .then(response => response.json() as Object[])
               .catch(this.handleError);
  }
  
  postNewImage(data:Object): Promise<Hero> {
    return this.http
      .post(this.imagesApiUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }  
  
  deleteImage(id:string): Promise<Object[]> {
    return this.http.delete(this.imagesApiUrl + id)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }   
  
  toggleImageFavoriteForUser(imageId:string, userId:string): Promise<Object[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put('/api/images/user-favorited/' + imageId, userId, headers)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }   

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return;
  } 

}