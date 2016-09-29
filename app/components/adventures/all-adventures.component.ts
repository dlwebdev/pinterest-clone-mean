import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-all-adventures',
    templateUrl: 'components/adventures/all-adventures.component.html',
    styleUrls: ['components/adventures/all-adventures.component.css']
})
export class AllAdventuresComponent {
    name: string = "Everyones Adventures";
    images: array = [
        {
        "text": "Hiking the Rockies!",
        "img-url": "",
        "username": "",
        "favorite-count": 0
        }
    ]    

    constructor() { }
    
    ngOnInit() {
        this.initMasonry();    
    }    
    
    initMasonry() {
        var msnry = new Masonry( '.grid', {
          itemSelector:'.grid-item',
          columnWidth: 200
        });        
    }
}