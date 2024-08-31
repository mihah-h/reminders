import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Reminder } from '../../core/models/reminder';
import { RemindersService } from '../../core/services/reminders.service';
import { FormControl, FormGroup } from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-reminder',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelect, MatOption
  ],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss'
})
export class ReminderComponent {
  public reminder: Reminder | undefined;
  public reminder$!: Observable<Reminder | undefined>;
  myForm!: FormGroup;

  constructor(
    private _remindersService: RemindersService,
    private _activatedRoute: ActivatedRoute,
  ) {
  }


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
      this.myForm = new FormGroup({

        userName: new FormControl(reminder?.creationDateTime),
        userEmail: new FormControl("" ),
      });
    })

  }
}
