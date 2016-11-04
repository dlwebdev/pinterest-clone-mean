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
        image.src='/images/placeholder.png';
        console.log("Retrigger grid.");
        
        //image.onerror = "";
        //image.src = "/images/placeholder.png";
        //return true;
    }    
    
    ngAfterViewInit() {
        
        $( document ).ready(function() {
            console.log("Jquery is here. Checking for broken images...");
            
            //$('.grid-image').brokenImage({replacement: '/images/placeholder.png'});
            
            /*
            $('img').error(function(){ 
                console.log("Found broken image..");
                $(this).attr('src', '/images/placeholder.png');
            });
            */
        });        
        
        this.initMasonry();    
    }
    
    getImages(): void {
        this.imagesService
            .getAllImages()
            .then(images => {
                this.images = images;
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
        
        //$('.image-wrapper img').brokenImage({replacement: '/images/placeholder.png'});
    }
    
}