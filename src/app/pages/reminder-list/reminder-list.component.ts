import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

import { RemindersService } from '../../core/services/reminders.service';
import { Reminder } from '../../core/models/reminder.class';
import { StatusComponent } from './status/status.component';

@Component({
  selector: 'app-reminder-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    StatusComponent,
    DatePipe
  ],
  templateUrl: './reminder-list.component.html',
  styleUrl: './reminder-list.component.scss'
})
export class ReminderListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['shortDescription', 'creationDateTime', 'dueDateTime', 'status'];
  public dataSourceReminders!: MatTableDataSource<Reminder> ;

  private _reminders: Reminder[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public remindersService: RemindersService,
    private _liveAnnouncer: LiveAnnouncer,
    private _router: Router,
  ) {}

  ngOnInit() {
    this._reminders = this.remindersService.getReminders();
    this.dataSourceReminders = new MatTableDataSource(this._reminders);
  }

  ngAfterViewInit() {
    this.dataSourceReminders.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  goToReminderPage(reminder: Reminder) {
    const reminderIndex = this._reminders.indexOf(reminder);
    this._router.navigate(['/reminder', reminderIndex]);
  }
}
