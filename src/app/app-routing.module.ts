import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpscreenComponent } from './otpscreen/otpscreen.component';
import { AppComponent } from './app.component';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LoginwithcodeComponent } from './loginwithcode/loginwithcode.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ProfilepicComponent } from './profilepic/profilepic.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { LoaderComponent } from './loader/loader.component';
import { SuggestfriendComponent } from './suggestfriend/suggestfriend.component';
import { SearchusersComponent } from './searchusers/searchusers.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {path: 'loginsignup', component: LoginsignupComponent},
  {path:'otp',component:OtpscreenComponent},
  {path:'createuser',component:CreateuserComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'loginwithcode',component:LoginwithcodeComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'profilepic',component:ProfilepicComponent},
  {path:'updateuser',component:UpdateuserComponent},
  {path:'suggest',component:SuggestfriendComponent},
  {path:'search',component:SearchusersComponent},
  {path:'profile',component:ProfileComponent},
  {path:'notification',component:NotificationsComponent},
  {path:'viewprofile',component:ViewProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
