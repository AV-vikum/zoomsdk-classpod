export class Teacher {
  public address: {
    city: string;
    id: string;
    // eslint-disable-next-line id-blacklist
    number: string;
    street: string;
    zipCode: string;
  };
  public id: string;
  public email: string;
  public mobile: string;
  public name: string;
  public verified: boolean;
  public imgUrl: string;
}
