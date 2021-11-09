import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './model/student.model';
import { MeetingAuth } from './model/meetingAuth.model';
import { Keys } from './model/keys.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endUrl = 'https://prodapi.classpod.online/api/';

  constructor(private http: HttpClient) {}

  /////////////////////////////////////////////////////////////////////////////////
  /////heder from method

  getHeders(token) {
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  //get student details

  getStudentDetails(token) {
    return this.http.get<Student>(
      this.endUrl + 'student/getStudentDetails',
      this.getHeders(token)
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  //Get particular metting details

  getMeetingDetails(id: any, token) {
    return this.http.post<MeetingAuth>(
      `${this.endUrl}student/getMeetingDetails`,
      { id },
      this.getHeders(token)
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  //Get  key and Secret Key

  getKeys(id: any, token) {
    return this.http.post<Keys>(
      `${this.endUrl}teacher/getKeys`,
      { id },
      this.getHeders(token)
    );
  }

  getSignature(
    apiKey: any,
    apiSecret: any,
    meetingNumber: any,
    role: any,
    token
  ) {
    return this.http.post(
      `${this.endUrl}teacher/getSignature`,
      {
        apiKey,
        apiSecret,
        meetingNumber,
        role,
      },
      this.getHeders(token)
    );
  }
}
