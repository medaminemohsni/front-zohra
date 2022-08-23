export class Meeting {
  id: Number;
  idFormation: Number;
  idInstructor: Number;
  date: Date;
  link: String;
  constructor(meeting: Meeting = null) {
    this.id = meeting?.id ?? null;
    this.idFormation = meeting?.idFormation ?? null;
    this.idInstructor = meeting?.idInstructor ?? null;
    this.date = meeting?.date ?? null;
    this.link = meeting?.link ?? '';
  }
}
