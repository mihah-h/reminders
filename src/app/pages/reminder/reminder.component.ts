import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Reminder } from '../../core/models/reminder.class';
import { map, Observable } from 'rxjs';
import { StatusService } from '../../core/services/status.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MtxDatetimepicker,
  MtxDatetimepickerModule,
  MtxDatetimepickerToggle
} from '@ng-matero/extensions/datetimepicker';
import { MtxNativeDatetimeModule } from '@ng-matero/extensions/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { provideMomentDatetimeAdapter } from '@ng-matero/extensions-moment-adapter';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-reminder',
  standalone: true,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
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
    MatFormFieldModule, MatDatepickerModule, MatSelect, MatOption,
    ReactiveFormsModule, MatInput, MatButton, MtxDatetimepicker, MtxDatetimepickerToggle,
    MtxNativeDatetimeModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MtxDatetimepickerModule, MatIcon,
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
    private _router: Router,
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

  public goReminderListPage() {
    this._router.navigate(['']).then()
  }
}
