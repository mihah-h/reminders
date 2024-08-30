import { Injectable } from '@angular/core';
import { Reminder } from '../models/reminder';
import { Status } from '../models/status';
import { STATUS_NAME } from '../models/status-name';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  private reminders: Reminder[] = [
    new Reminder(
      'Позвонить родителям',
      'Позвонить родителям, узнать как дела и поздравить с днем рождения',
      new Date(2023, 11, 20, 10, 0, 0),
      new Date(2023, 11, 20, 18, 0, 0),
      new Status(STATUS_NAME.EXPIRED)
    ),
    new Reminder(
      'Купить продукты',
      'Купить продукты в магазине напротив дома: хлеб, молоко, яйца, сыр',
      new Date(2023, 11, 21, 12, 0, 0),
      new Date(2023, 11, 21, 14, 0, 0),
      new Status(STATUS_NAME.COMPLETED)
    ),
    new Reminder(
      'Встретиться с другом',
      'Встретиться с другом в кафе напротив парка, обсудить планы на выходные',
      new Date(2023, 11, 22, 16, 0, 0),
      new Date(2023, 11, 22, 18, 0, 0),
      new Status(STATUS_NAME.COMPLETED)
    ),
    new Reminder(
      'Записаться на курсы',
      'Записаться на курсы английского языка, изучить расписание и стоимость',
      new Date(2023, 11, 23, 10, 0, 0),
      new Date(2023, 11, 23, 12, 0, 0),
      new Status(STATUS_NAME.COMPLETED)
    ),
    new Reminder(
      'Починить велосипед',
      'Отвезти велосипед в мастерскую, заменить покрышку и проверить тормоза',
      new Date(2023, 11, 24, 14, 0, 0),
      new Date(2023, 11, 24, 16, 0, 0),
      new Status(STATUS_NAME.NEW)
    ),
    new Reminder(
      'Сходить в кино',
      'Сходить в кино с девушкой, посмотреть новый фильм, купить попкорн',
      new Date(2023, 11, 25, 18, 0, 0),
      new Date(2023, 11, 25, 20, 0, 0),
      new Status(STATUS_NAME.PLANNED)
    ),
    new Reminder(
      'Заплатить за интернет',
      'Оплатить счет за интернет, проверить баланс и продлить подписку',
      new Date(2023, 11, 26, 10, 0, 0),
      new Date(2023, 11, 26, 12, 0, 0),
      new Status(STATUS_NAME.PLANNED)
    ),
    new Reminder(
      'Проверить почту',
      'Проверить почту, ответить на письма и удалить спам',
      new Date(2023, 11, 27, 14, 0, 0),
      new Date(2023, 11, 27, 16, 0, 0),
      new Status(STATUS_NAME.NEW)
    ),
  ];

  constructor() {}

  getReminders() {
    return this.reminders;
  }

  getReminder(index: number): Reminder | undefined {
    return this.reminders[index];
  }

  updateReminder(index: number, updatedReminder: Reminder): Reminder | undefined {
    const reminder = this.getReminder(index);
    if (reminder) {
      Object.assign(reminder, updatedReminder);
      return reminder;
    }
    return undefined;
  }
}
