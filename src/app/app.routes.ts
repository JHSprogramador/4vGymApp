import { Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { MonitorsComponent } from './monitors/monitors.component';

export const routes: Routes = [
    { path: 'actividades', component: ActivitiesComponent },
    { path: 'monitors', component: MonitorsComponent },
    { path: '', redirectTo: '/actividades', pathMatch: 'full' },
  ];
