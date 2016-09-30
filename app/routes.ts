import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AllAdventuresComponent } from './components/adventures/all-adventures.component';
import { AboutComponent } from './components/about/about.component';
import { ManageComponent } from './components/manage/manage.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/all-adventures',
    pathMatch: 'full'
  },    
  {
    path: 'all-adventures',
    component: AllAdventuresComponent
  },  
  {
    path: 'manage',
    component: ManageComponent
  }  
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });