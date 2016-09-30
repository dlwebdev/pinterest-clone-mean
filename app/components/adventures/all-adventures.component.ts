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
    
    images2: array = [
        {
            "id": "1",
            "text": "Hiking the Rockies!",
            "imgUrl": "http://static.travel.usnews.com/images/destinations/128/hiking_in_the_rockies.jpg",
            "username": "@danwillcode",
            "user-icon": "",
            "favoriteCount": 6
        },
        {
            "id": "2",
            "text": "What a rush!",
            "imgUrl": "http://media1.santabanta.com/full1/Adventure%20Sports/Adventure%20Sports/adventure-sports-50a.jpg",
            "username": "",
            "favoriteCount": 2
        },
        {
            "id": "3",
            "text": "Submerged",
            "imgUrl": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg",
            "username": "",
            "favoriteCount": 1
        },
        {
            "id": "4",
            "text": "What a view",
            "imgUrl": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/look-out.jpg",
            "username": "@danwillcode",
            "user-icon": "",
            "favoriteCount": 10
        },
        {
            "id": "5",
            "text": "One-World Trade",
            "imgUrl": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/one-world-trade.jpg",
            "username": "",
            "favoriteCount": 0
        },
        {
            "id": "6",
            "text": "Drizzle",
            "imgUrl": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg",
            "username": "",
            "favoriteCount": 2
        },        
        {
            "id": "7",
            "text": "Cat Nose",
            "imgUrl": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/cat-nose.jpg",
            "username": "",
            "favoriteCount": 1
        }        
    ]    

    constructor(private imagesService: ImagesService) { } 
    
    ngOnInit() {
        this.getImages();
    }     
    
    ngAfterViewInit() {
        this.initMasonry();    
    }
    
    getImages(): void {
        this.imagesService
            .getAllImages()
            .then(images => this.images = images);
    }
    
    initMasonry() {

        const grid = document.querySelector('.grid');
        let msnry;
        
        imagesLoaded( grid, function() {
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