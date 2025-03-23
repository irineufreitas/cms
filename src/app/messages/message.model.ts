export class Message {
senderName: any;
  constructor(
    public subject: string,
    public msgText: string,
    public sender: string | { name: string },
    public id?: string,     // optional frontend-only ID
    public _id?: string     // optional backend Mongo ID
  ) {}
}