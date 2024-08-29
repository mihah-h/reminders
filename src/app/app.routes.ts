import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/reminder-list/reminder-list.component').then((x) => x.ReminderListComponent),
  },
  {
    path: 'reminder/:id',
    loadComponent: () =>
      import('./pages/reminder/reminder.component').then((x) => x.ReminderComponent),
  },
];
