import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/reminder-list/reminder-list.component').then((x) => x.ReminderListComponent),
  },
  {
    path: 'reminder/:index',
    loadComponent: () =>
      import('./pages/reminder/reminder.component').then((x) => x.ReminderComponent),
  },
];
