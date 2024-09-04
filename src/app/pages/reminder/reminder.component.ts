import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MtxDatetimepickerModule, } from '@ng-matero/extensions/datetimepicker';
import { provideMomentDatetimeAdapter } from '@ng-matero/extensions-moment-adapter';
import { map } from 'rxjs';

import { RemindersService } from '../../core/services/reminders.service';
import { StatusService } from '../../core/services/status.service';
import { Reminder } from '../../core/models/reminder.class';
import { Status } from '../../core/models/status.class';


@Component({
  selector: 'app-reminder',
  standalone: true,
  providers: [
    StatusService,
    provideMomentDatetimeAdapter({
      parse: {
        datetimeInput: 'DD-MM-YYYY HH:mm',
      },
      display: {
        dateInput: 'DD.MM.YYYY',
        monthInput: 'MMMM',
        yearInput: 'YYYY',
        timeInput: 'HH:mm',
        datetimeInput: 'DD.MM.YYYY, HH:mm ',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
        popupHeaderDateLabel: 'MMM DD, ddd',
      },
    },  ),
  ],
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MtxDatetimepickerModule,
    MatIcon,
  ],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss',
})
export class ReminderComponent implements OnInit {
  public reminderForm!: FormGroup;

  private reminderIndex!: number;

  private _destroyRef = inject(DestroyRef);

  constructor(
    public statusService: StatusService,
    private _remindersService: RemindersService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {}

  public ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        map((params) => {
          this.reminderIndex = params['index'];
          return this._remindersService.getReminder(this.reminderIndex);
        }),
        takeUntilDestroyed(this._destroyRef),
      ).subscribe((reminder) => {
        this.createReminderForm(reminder);
    })
  }

  createReminderForm(reminder: Reminder | undefined) {
    if (reminder) {
      this.reminderForm = new FormGroup({
        shortDescription: new FormControl(reminder.shortDescription, Validators.required),
        fullDescription: new FormControl(reminder.fullDescription),
        creationDateTime: new FormControl(reminder.creationDateTime, Validators.required),
        dueDateTime: new FormControl(reminder.dueDateTime),
        status: new FormControl(reminder.status.name),
      });
    }
  }

  public goReminderListPage() {
    this._router.navigate(['']).then(() => {
      this.reminderForm.reset();
    });
  }

  public save() {
    const reminderFormValue = this.reminderForm.value;

    const updatedReminder = new Reminder(
      reminderFormValue.shortDescription,
      reminderFormValue.fullDescription,
      reminderFormValue.creationDateTime,
      reminderFormValue.dueDateTime,
      new Status(reminderFormValue.status),
    );

    this._remindersService.updateReminder(this.reminderIndex, updatedReminder);
    this._router.navigate(['']).then(() => {
      this.reminderForm.reset();
    });
  }
}
