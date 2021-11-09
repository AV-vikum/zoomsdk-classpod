import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Keys } from '../model/keys.model';
import { MeetingAuth } from '../model/meetingAuth.model';
import { Student } from '../model/student.model';
import { UserService } from '../user.service';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

@Component({
  selector: 'app-new-meeting',
  templateUrl: './new-meeting.component.html',
  styleUrls: ['./new-meeting.component.css'],
})
export class NewMeetingComponent implements OnInit {
  studentDetails: Student;
  keys: Keys;
  meetingDetails: MeetingAuth;
  token;
  meetingId;
  teacherId;
  showBtn = false;

  signatureEndpoint =
    'https://prodapi.classpod.online/api/teacher/getSignature';

  role = 0;
  leaveUrl = 'https://classpod.online/meeting';

  client = ZoomMtgEmbedded.createClient();

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
                  this.getSignature();
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

    ////////////////////////////////////
    //////////////////meeting init
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    this.client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: [
          'topic',
          'host',
          'mn',
          'pwd',
          'telPwd',
          'invite',
          'participant',
          'dc',
          'enctype',
        ],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              },
            },
          ],
        },
      },
    });
  }

  ////////////////////////////////////////////
  ////////////////////////
  getSignature() {
    this.userService
      .getSignature(
        this.keys.apiKey,
        this.keys.apiSecret,
        this.meetingDetails.meetingId,
        0,
        this.token
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err.error.text);
          // this.startMeeting(err.error.text);
          if (err.error.text) {
            this.startMeeting(err.error.text);
          } else {
            console.log('error');
          }
        }
      );
  }

  ////////////////////////////////////////////
  ////////////////////////

  startMeeting(signature) {
    this.client.join({
      apiKey: this.keys.apiKey,
      signature: signature,
      meetingNumber: this.meetingDetails.meetingId,
      password: this.meetingDetails.meetingPassword,
      userName: this.studentDetails.userName,
      userEmail: this.studentDetails.email,
    });
  }
}
