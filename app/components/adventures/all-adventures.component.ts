import { Component, OnInit, ngAfterViewInit } from '@angular/core';

import { ImagesService } from "../shared/services/images.service";

@Component({
    selector: 'my-all-adventures',
    templateUrl: 'components/adventures/all-adventures.component.html',
    styleUrls: ['components/adventures/all-adventures.component.css']
})
export class AllAdventuresComponent {
    name: string = "Everyones Adventures";
    images: array = [];
    errors: array = [];

    constructor(private imagesService: ImagesService) { } 
    
    ngOnInit() {
        this.getImages();
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
        let image = this.images[imageIndex];
        console.log("Will increment favorite count for this image unless they have already done so before. Then unfavorite it.");
        console.log(image);
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