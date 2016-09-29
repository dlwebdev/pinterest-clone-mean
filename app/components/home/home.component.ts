import { Component, OnInit } from '@angular/core';
//import { FORM_DIRECTIVES } from '@angular/forms';
//import { Http } from "@angular/http";
//import './rxjs-operators';

@Component({
    selector: 'my-home',
    templateUrl: 'components/home/home.component.html',
    styleUrls: ['components/home/home.component.css']
    //directives: [FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {
 
    constructor() { }
    
    /**
    * Get the names OnInit
    */
    ngOnInit() {

    }    
}