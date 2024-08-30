import { Injectable } from '@angular/core';
import { Reminder } from '../models/reminder';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private reminders: Reminder[] = [];

  constructor() {}

  getReminders() {
    return this.reminders;
  }

  getReminder(index: number): Reminder | undefined {
    return this.reminders[index];
  }

  createReminder(shortDescription: string, fullDescription: string, dueDateTime: Date, status: Status) {
    this.reminders.push(new Reminder(shortDescription, fullDescription, dueDateTime, status));
  }

  updateReminder(index: number, updatedReminder: Reminder): Reminder | undefined {
    const reminder = this.getReminder(index);
    if (reminder) {
      Object.assign(reminder, updatedReminder);
      return reminder;
    }
    return undefined;
  }

  deleteReminder(index: number) {
    const reminder = this.getReminder(index);
    if (reminder) {
      this.reminders.splice(index, 1);
    }
  }
}
