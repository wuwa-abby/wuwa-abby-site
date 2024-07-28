import { Routes } from '@angular/router';

import { GettingStartedComponent } from '@routes/getting-started/getting-started.component';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: GettingStartedComponent,
  },

  /* 404 redirect */
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
