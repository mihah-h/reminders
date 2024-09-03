import { Status } from './status.class';

export class Reminder {
  constructor(
    public shortDescription: string,
    public fullDescription: string,
    public creationDateTime: Date,
    public dueDateTime: Date,
    public status: Status,
  ) {}
}
