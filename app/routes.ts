import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, terminal: true },
    { path: 'about', component: AboutComponent },
    { path: 'test', component: TestComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
