import { Injectable } from '@angular/core';
import { StatusNameForSelect } from '../models/status-name-for-select.interface';

@Injectable()
export class StatusService {
  public readonly statusNamesForSelect: StatusNameForSelect[] = [
    {value: 'new', viewValue: 'Новый'},
    {value: 'planned', viewValue: 'Запланирован'},
    {value: 'completed', viewValue: 'Исполнен'},
    {value: 'expired', viewValue: 'Просрочен'},
  ];

  constructor() { }
}
