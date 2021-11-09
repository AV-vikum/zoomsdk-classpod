import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MeetingComponent } from './meeting/meeting.component';
import { NewMeetingComponent } from './new-meeting/new-meeting.component';

const routes: Routes = [
  { path: '', redirectTo: 'meeting/:mid/:tid/:tk/:rtk', pathMatch: 'full' },
  { path: 'meeting/:mid/:tid/:tk/:rtk', component: MeetingComponent },
  { path: 'new-meeting/:mid/:tid/:tk/:rtk', component: NewMeetingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
