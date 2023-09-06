import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-otpscreen',
  templateUrl: './otpscreen.component.html',
  styleUrls: ['./otpscreen.component.css']
})
export class OtpscreenComponent implements OnInit{
  response:any={};
  OTP:String=''
  res:String="OTP Sent to your email"
  requestBody:any={}
  resendOtpBody:any={}
  isLoading=false;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute){
    
  }
 
   mail = this.route.snapshot.queryParamMap.get("Email");
   ngOnInit(): void {
    if(this.mail==null){
      this.router.navigate(['/loginsignup'])
    }
}
 

  verifyEmail(otp:{first:String,sec:String,third:String,fourth:String}){
    this.isLoading=true;
   this.OTP = this.OTP.concat(otp.first.toString(),otp.sec.toString(),otp.third.toString(),otp.fourth.toString());
   this.requestBody.EmailAddress = this.mail
   this.requestBody.OTP = this.OTP
   const header = new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8'
      });
      
const requestOptions = { headers: header };
   this.http.post('http://localhost:8081/v1/user/verify-email',this.requestBody)
   .subscribe(res=>{
     this.response= res
     if(this.response.Status===200){
      this.isLoading=false;
      this.router.navigate(['/createuser'],{queryParams:{Email:this.mail}});
      }else if(this.response.Status===202){
        this.isLoading=false;
        this.router.navigate(['/loginsignup']);
      }
        else{
          this.isLoading=false;
        this.router.navigate(['/otp'],{queryParams:{Email:this.mail}}).then(()=>{
          window.location.reload();
        });
      }
   })
  }

  resendOtp(){
    console.log(this.mail)
    const header = new HttpHeaders({
         'Content-Type':'application/json; charset=utf-8'
       });
 this.resendOtpBody.Email= this.mail
 const requestOptions = { headers: header };
    this.http.post('http://localhost:8081/v1/user/send-otp',this.resendOtpBody)
    .subscribe(res=>{
      console.log(res)
      this.response= res
      if(this.response.Status===200){
       this.router.navigate(['/otp'],{queryParams:{Email:this.mail}});
       }else{
         this.router.navigate(['/loginsignup']);
       }
    })
   }
}
