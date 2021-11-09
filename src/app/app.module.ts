import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MeetingComponent } from './meeting/meeting.component';
import { AppRoutingModule } from './app-routing.module';
import { NewMeetingComponent } from './new-meeting/new-meeting.component';

@NgModule({
  declarations: [AppComponent, MeetingComponent, NewMeetingComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
