import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { RemindersService } from '../../core/services/reminders.service';
import { Reminder } from '../../core/models/reminder.class';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { StatusComponent } from './status/status.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminder-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatCell,
    MatHeaderCell,
    MatHeaderRowDef,
    MatRow,
    MatHeaderRow,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatSortHeader,
    MatSort,
    DatePipe,
    MatIcon,
    MatFabButton,
    MatIconButton,
    MatButton,
    StatusComponent
  ],
  templateUrl: './reminder-list.component.html',
  styleUrl: './reminder-list.component.scss'
})
export class ReminderListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['shortDescription', 'creationDateTime', 'dueDateTime', 'status'];
  reminders: Reminder[] = [];
  dataSource!: MatTableDataSource<Reminder> ;

  constructor(
    public remindersService: RemindersService,
    private _liveAnnouncer: LiveAnnouncer,
    private _router: Router,
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.reminders = this.remindersService.getReminders();
    this.dataSource = new MatTableDataSource(this.reminders);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  goToReminderPage(reminder: Reminder) {
    const reminderIndex = this.reminders.indexOf(reminder);
    this._router.navigate(['/reminder', reminderIndex])
  }
}
