import { Component } from '@angular/core';
import { Http } from "@angular/http";
//import './rxjs-operators';

@Component({
    selector: 'my-test',
    templateUrl: 'components/test/test.component.html',
    styleUrls: ['components/test/test.component.css']
})
export class TestComponent {
    name: string = "Test";
    rsvps: {};

    constructor(http: Http) {
        console.log("GETTING RSVPS from API!");
        
        http.get("/api/rsvps")
            .map(data => data.json())
            .subscribe((data) => this.rsvps = data);
    }
}