import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Keys } from '../model/keys.model';
import { MeetingAuth } from '../model/meetingAuth.model';
import { Student } from '../model/student.model';
import { UserService } from '../user.service';

import { ZoomMtg } from '@zoomus/websdk';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css'],
})
export class MeetingComponent implements OnInit {
  studentDetails: Student;
  keys: Keys;
  meetingDetails: MeetingAuth;
  token;
  meetingId;
  teacherId;
  showBtn = true;

  // signatureEndpoint =
  //   'https://prodapi.classpod.online/api/teacher/getSignature';
  // apiKey = '7LzCTqbCSti43-s9juExHQ';
  // meetingNumber = '91953970722';
  role = 0;
  leaveUrl = 'https://classpod.online/meeting';
  // userName = 'Angular';
  // userEmail = 'iroshmayantha.16@cse.mrt.ac.lk';
  // passWord = 'MxkK4M';
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar
  registrantToken = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public httpClient: HttpClient,
    @Inject(DOCUMENT) document
  ) {}

  ngOnInit(): void {
    this.meetingId = this.activatedRoute.snapshot.paramMap.get('mid');
    this.teacherId = this.activatedRoute.snapshot.paramMap.get('tid');
    this.token = this.activatedRoute.snapshot.paramMap.get('tk');
    // console.log(this.activatedRoute.snapshot.paramMap.get('rtk'));

    this.userService.getStudentDetails(this.token).subscribe(
      (res) => {
        this.studentDetails = res;
        console.log(this.studentDetails);
        this.userService
          .getMeetingDetails(this.meetingId, this.token)
          .subscribe(
            (res1) => {
              this.meetingDetails = res1;
              console.log(res1);
              this.userService.getKeys(this.teacherId, this.token).subscribe(
                (res2) => {
                  this.keys = res2;
                  console.log(res2);
                },
                (err2) => {
                  console.log(err2);
                  this.showBtn = true;
                }
              );
            },
            (err1) => {
              console.log(err1);
              this.showBtn = true;
            }
          );
      },
      (err) => {
        console.log(err);
        this.showBtn = true;
      }
    );
  }

  getSignature() {
    this.userService
      .getSignature(
        this.keys.apiKey,
        this.keys.apiSecret,
        this.meetingDetails.meetingId,
        this.role,
        this.token
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
      disableInvite: true,
      meetingInfo: [],
      success: (success) => {
        console.log('init okay');
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingDetails.meetingId,
          userName: this.studentDetails.userName,
          apiKey: this.keys.apiKey,
          passWord: this.meetingDetails.meetingPassword,
          tk: this.registrantToken,
          success: (success) => {
            console.log('success');
            console.log(success);
          },
          error: (error) => {
            console.log('error');
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
        console.log('init faild');
      },
    });
  }
}
