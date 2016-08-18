import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'my-app',
    template: `
<h1>My First {{name}} app</h1>
<router-outlet></router-outlet>
<a [routerLink]="['/']">Home</a> | <a [routerLink]="['/about']">About</a>`,
})
export class AppComponent {
    name: string = "Angular 2 on Express";

    constructor() {}
}
