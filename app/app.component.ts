import { Component } from '@angular/core';
    
@Component({
      selector: 'my-app',
      template: `
        <my-navbar></my-navbar>
        <router-outlet></router-outlet>
       `
})
    
export class AppComponent { }