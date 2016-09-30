import { Component, OnInit } from '@angular/core';

import { AuthService } from "../services/auth.service";

@Component({
    selector: 'my-navbar',
    templateUrl: 'components/shared/navbar/navbar.component.html',
    styleUrls: ['components/shared/navbar/navbar.component.css']
})
export class NavbarComponent implements OnInit {
    user: any = '';
    userLoggedIn: boolean = false;
    errorMessage: string;    
    
    constructor(private authService: AuthService) { } 
    
    ngOnInit() {
        this.getUserAuthStatus();
    }    
    
    getUserAuthStatus(): void {
      this.authService
        .getUserAuthStatus()
        .then(userResp => this.userLoggedIn = userResp.authenticated);
    }    
    
}