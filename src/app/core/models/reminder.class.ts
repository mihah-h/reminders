import { Status } from './status.class';

export class Reminder {
  constructor(
    public shortDescription: string,
    public fullDescription: string = '',
    public creationDateTime: Date,
    public dueDateTime: Date | null = null,
    public status: Status,
  ) {}
}
