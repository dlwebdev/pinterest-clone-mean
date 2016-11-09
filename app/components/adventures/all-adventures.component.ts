import { Component, OnInit, ngAfterViewInit } from '@angular/core';

import { ImagesService } from "../shared/services/images.service";
import { AuthService } from "../shared/services/auth.service";

@Component({
    selector: 'my-all-adventures',
    templateUrl: 'components/adventures/all-adventures.component.html',
    styleUrls: ['components/adventures/all-adventures.component.css']
})
export class AllAdventuresComponent {
    name: string = "Everyones Adventures";
    images: array = [];
    errors: array = [];
    userLoggedIn: boolean = false;

    constructor(private imagesService: ImagesService, private authService: AuthService) { } 
    
    ngOnInit() {
        this.getUserAuthStatus();
        this.getImages();
    }     
    
    getUserAuthStatus(): void {
      this.authService
        .getUserAuthStatus()
        .then(userResp => this.userLoggedIn = userResp.authenticated);
    }      
    
    imgError(image) {
        image.imgUrl='/images/placeholder.png';
        this.initMasonry();
    }    
    
    ngAfterViewInit() {
        this.initMasonry();    
    }
    
    getImages(): void {
        this.imagesService
            .getAllImages()
            .then(images => {
                this.images = images;
            });
    }
    
    incrementFavorite(imageIndex: string): void {
        // Check if they are logged in. If not, they cannot favorite it. SHOULD PROBABLY NOT SHOW AT ALL IF NOT LOGGED IN
        
        if(this.userLoggedIn) {
            console.log("User is logged in. Allow them to favorite if they have not done so before.");
        } else {
            console.log("User is not logged in. Send them to login page.");
        }
        
        let image = this.images[imageIndex];
        
        let user = {
            "userId":"0"
        }
        
        console.log("Will increment favorite count for this image unless they have already done so before. Then unfavorite it.");
        console.log(image);
        
        this.imagesService
            .toggleImageFavoriteForUser(image._id)//this.user._id);
            .then(image => {
                console.log("Response from incrementFavorite: ", image);
                this.images[imageIndex] = image;
            });            
    }
    
    initMasonry() {
        const grid = document.querySelector('.grid');
        let msnry;
        
        var imgLoad = imagesLoaded( grid, function() {
          // init Isotope after all images have loaded
          msnry = new Masonry( grid, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: 10,
            percentPosition: true
          });
        });   
    }
    
}