/* eslint-disable @typescript-eslint/naming-convention */
export class Meeting {
  public id: number;
  public class_fk: number;
  public exam: string;
  public examYear: number;
  public fees: string;
  public meetingTime: string;
  public student_fk: number;
  public subject: string;
  public teacherName: string;
  public teacher_fk: number;
  public zoomMeetingId: string;
  constructor(parameters) {
  }
}
