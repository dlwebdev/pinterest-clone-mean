import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AllAdventuresComponent } from './components/adventures/all-adventures.component';
import { AboutComponent } from './components/about/about.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },    
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'all-adventures',
    component: AllAdventuresComponent
  },  
  {
    path: 'about',
    component: AboutComponent
  }  
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });