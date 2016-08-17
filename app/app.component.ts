import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    name: string = "Angular 2 on Express";

    constructor() {}
}
