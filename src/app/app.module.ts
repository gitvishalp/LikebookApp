import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OtpscreenComponent } from './otpscreen/otpscreen.component';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LoginwithcodeComponent } from './loginwithcode/loginwithcode.component';
import { LoaderComponent } from './loader/loader.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ProfilepicComponent } from './profilepic/profilepic.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { SuggestfriendComponent } from './suggestfriend/suggestfriend.component';
import { SearchusersComponent } from './searchusers/searchusers.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    OtpscreenComponent,
    LoginsignupComponent,
    CreateuserComponent,
    DashboardComponent,
    ForgetpasswordComponent,
    LoginwithcodeComponent,
    LoaderComponent,
    ChangepasswordComponent,
    ProfilepicComponent,
    UpdateuserComponent,
    SuggestfriendComponent,
    SearchusersComponent,
    ProfileComponent,
    NotificationsComponent,
    ViewProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
