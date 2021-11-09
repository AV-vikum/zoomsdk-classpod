import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { ZoomMtg } from '@zoomus/websdk';
import { UserService } from './user.service';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signatureEndpoint = '';
  apiKey = '';
  meetingNumber = '123456789';
  role = 0;
  leaveUrl = 'http://localhost:4200';
  userName = 'Angular';
  userEmail = '';
  passWord = '';
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar
  registrantToken = '';

  constructor(
    public httpClient: HttpClient,
    @Inject(DOCUMENT) document,
    private userService: UserService
  ) {}

  ngOnInit() {}

  getSignature() {
    this.userService
      .getSignature(
        '0YX8mBYcRfGHhhmLfM0wvw',
        'dlDfcbDKyrpzVdtn9x8KFDcMFkDV64zX9Q6e',
        '9248436805',
        this.role,
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJha2lsYXZpa3VtMTBAZ21haWwuY29tIiwicm9sZXMiOlsiU1RVREVOVCJdLCJpc3MiOiJodHRwOi8vcHJvZGFwaS5jbGFzc3BvZC5vbmxpbmUvYXBpL2xvZ2luIiwiZXhwIjoxNjM2NDc0MzQ2fQ.O05re8jL2Of_HTk34f4HPkcYCJ5iF6nr-bXgGBlJOS8'
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err.error.text);
          this.startMeeting(err.error.text);
        }
      );
  }

  startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      success: (success) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          meetingNumber: '9248436805',
          userName: 'angular',
          apiKey: '0YX8mBYcRfGHhhmLfM0wvw',
          userEmail: 'akila@gmail.com',
          passWord: 'asdfgtr',
          tk: this.registrantToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
