/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
export class Student {
  public id: string;
  public name: string;
  public userName: string;
  public email: string;
  public mobile: string;
  public examYear: string;
  public password: string;
  public address: {
    city: string;
    street: string;
    // eslint-disable-next-line id-blacklist
    number: string;
    zipCode: string;
  };
  public classSubscriptionList: [];
  public studentTeacherList: [
    {
      id: string;
      student_fk: string;
      teacher_fk: string;
    }
  ];
  public verificationCode: string;
  public verified: boolean;

  constructor() {}
}
