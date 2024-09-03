import { Injectable } from '@angular/core';
import { StatusNameForSelect } from '../models/status-name-for-select.interface';

@Injectable()
export class StatusService {
  public readonly statusNamesForSelect: StatusNameForSelect[] = [
    {value: 'new', viewValue: 'Новый'},
    {value: 'completed', viewValue: 'Исполнен'},
    {value: 'planed', viewValue: 'Запланирован'},
    {value: 'expired', viewValue: 'Просрочен'},
  ];

  constructor() { }
}
