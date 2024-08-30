import { Status } from './status';

export class Reminder {
  public creationDateTime: Date;
  constructor(
    public shortDescription: string,
    public fullDescription: string,
    public dueDateTime: Date,
    public status: Status,
  ) {
    this.creationDateTime = new Date();
  }
}
