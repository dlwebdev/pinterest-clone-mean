import { Component, OnInit } from '@angular/core';
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
    images: array = [];

    constructor(private authService: AuthService, private imagesService: ImagesService) { } 
    
    ngOnInit() {
        this.getCurrentUser();
        this.getImagesForUser();
    }  
    
    getCurrentUser(): void {
      this.authService.getCurrentUser()
        .then(userResp => {
            this.user = userResp;
            this.newImage.username = userResp.username;
        });
    }  
    
    getImagesForUser() {
        this.imagesService.getUsersImages()
            .then(images => {
                this.images = images;
            });        
    }
    
    saveImage(): void {
        this.imagesService.postNewImage(this.newImage)
          .then(image => {
            this.newImage = image;
          });        
    }
    
    deleteImage(index: string): void {
        let imageToDelete = this.images[index];
        
        this.imagesService.deleteImage(imageToDelete._id);
        this.images.splice(index, 1);
    }
    
}