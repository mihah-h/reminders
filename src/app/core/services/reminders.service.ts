import { Injectable } from '@angular/core';
import { Reminder } from '../models/reminder';
import { Status } from '../models/status';
import { STATUS_NAME } from '../models/status-name';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private reminders: Reminder[] = [
    {
      shortDescription: 'Купить молоко',
      fullDescription: 'Купить 1 литр молока в магазине на углу',
      dueDateTime: new Date(2024, 3, 15, 18, 0),
      status: new Status(STATUS_NAME.COMPLETED),
      creationDateTime: new Date(2023, 11, 12, 10, 15),
    },
    {
      shortDescription: 'Заплатить за интернет',
      fullDescription: 'Оплатить счет за интернет до 15 апреля',
      dueDateTime: new Date(2024, 3, 15, 23, 59),
      status: new Status(STATUS_NAME.EXPIRED),
      creationDateTime: new Date(2023, 10, 19, 15, 30),
    },
    {
      shortDescription: 'Встретиться с другом',
      fullDescription: 'Встреча с другом в кафе "Кофемания" в 19:00',
      dueDateTime: new Date(2024, 3, 18, 19, 0),
      status: new Status(STATUS_NAME.COMPLETED),
      creationDateTime: new Date(2024, 2, 10, 12, 45),
    },
    {
      shortDescription: 'Позвонить родителям',
      fullDescription: 'Позвонить родителям и поздравить с днем рождения',
      dueDateTime: new Date(2024, 3, 20, 12, 0),
      status: new Status(STATUS_NAME.COMPLETED),
      creationDateTime: new Date(2024, 1, 15, 11, 0),
    },
    {
      shortDescription: 'Сдать отчет',
      fullDescription: 'Сдать отчет по проекту "Аналитика" до конца недели',
      dueDateTime: new Date(2024, 3, 22, 23, 59),
      status: new Status(STATUS_NAME.NEW),
      creationDateTime: new Date(2024, 3, 10, 9, 30),
    },
    {
      shortDescription: 'Записаться на прием',
      fullDescription: 'Записаться на прием к врачу',
      dueDateTime: new Date(2024, 3, 25, 10, 0),
      status: new Status(STATUS_NAME.PLANNED),
      creationDateTime: new Date(2024, 3, 23, 14, 15),
    },
    {
      shortDescription: 'Купить билеты на концерт',
      fullDescription: 'Купить билеты на концерт любимой группы',
      dueDateTime: new Date(2024, 4, 5, 20, 0),
      status: new Status(STATUS_NAME.NEW),
      creationDateTime: new Date(2024, 2, 25, 16, 0),
    },
  ];

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
