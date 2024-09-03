import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Reminder } from '../../core/models/reminder.class';
import { map, Observable } from 'rxjs';
import { StatusService } from '../../core/services/status.service';
import { ActivatedRoute } from '@angular/router';
import { RemindersService } from '../../core/services/reminders.service';

import { MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-reminder',
  standalone: true,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-GB'},
    StatusService,
    provideNativeDateAdapter()
  ],
  imports: [
    MatFormFieldModule, MatDatepickerModule, MatSelect, MatOption, ReactiveFormsModule, MatInput, MatButton,
  ],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss'
})
export class ReminderComponent {
  public reminder: Reminder | undefined;
  public reminder$!: Observable<Reminder | undefined>;
  myForm!: FormGroup;

  constructor(
    public statusService: StatusService,
    private _remindersService: RemindersService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.reminder$ = this._activatedRoute.params
      .pipe(
        map((params) => {
          const reminderIndex = params['index'];
          console.log(reminderIndex);
          return this._remindersService.getReminder(reminderIndex);
        }),
      )

    this.reminder$.subscribe((reminder) => {
      if (reminder) {
        this.myForm = new FormGroup({
          shortDescription: new FormControl(reminder.shortDescription),
          fullDescription: new FormControl(reminder.fullDescription),
          creationDateTime: new FormControl(reminder.creationDateTime),
          dueDateTime: new FormControl(reminder.dueDateTime),
          status: new FormControl(reminder.status.name),
        });
        console.log(this.myForm)
      }
    })
  }


}
