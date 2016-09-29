import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-all-adventures',
    templateUrl: 'components/adventures/all-adventures.component.html',
    styleUrls: ['components/adventures/all-adventures.component.css']
})
export class AllAdventuresComponent {
    name: string = "Everyones Adventures";

    constructor() { }
    
    ngOnInit() {
        this.initMasonry();    
    }    
    
    initMasonry() {
        // vanilla JS
        console.log("Initializing masonry.");
        
        var msnry = new Masonry( '.grid', {
          itemSelector: '.grid-item,
          columnWidth: 200
        });        
    }
}