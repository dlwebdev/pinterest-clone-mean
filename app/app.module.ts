import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
//import { FormsModule }    from '@angular/forms';

import { HomeComponent } from "./components/home/home.component";
import { AppComponent }  from './app.component';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { AllAdventuresComponent } from './components/adventures/all-adventures.component';
import { AboutComponent } from "./components/about/about.component";

import { AuthService } from "./components/shared/services/auth.service";

import { routing } from "./routes";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing
    ],
    providers: [
        AuthService
    ],    
    declarations: [
        NavbarComponent,
        AppComponent,
        HomeComponent,
        AboutComponent,
        AllAdventuresComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
