import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { HttpModule, JsonpModule } from '@angular/http';
//import { FormsModule }    from '@angular/forms';

import { HomeComponent } from "./components/home/home.component";
import { AppComponent }  from './app.component';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { AllAdventuresComponent } from './components/adventures/all-adventures.component';
import { AboutComponent } from "./components/about/about.component";

import { routing } from "./routes";


@NgModule({
    imports: [
        BrowserModule,
        routing
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
