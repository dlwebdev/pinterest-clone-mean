import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ImagesService } from "../shared/services/images.service";
import { AuthService } from "../shared/services/auth.service";

@Component({
    selector: 'my-manage',
    templateUrl: 'components/manage/manage.component.html',
    styleUrls: ['components/manage/manage.component.css']
})
export class ManageComponent {
    user: object = {};
    
    newImage: object = {
        "text": "",
        "imgUrl": "",
        "username": "",
        "userIcon": "",
        "favoriteCount": 0        
    };

    constructor(private authService: AuthService, private imagesService: ImagesService) { } 
    
    ngOnInit() {
        this.getCurrentUser();
    }    
    
    getCurrentUser() {
      this.authService.getCurrentUser()
        .then(userResp => {
            this.user = userResp;
            this.newImage.username = userResp.username;
        });
    }     
    
    saveImage() {
        this.imagesService.postNewImage(this.newImage)
          .then(image => {
            this.newImage = image;
          });        
    }
}