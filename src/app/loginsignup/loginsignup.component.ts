import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-loginsignup',
  templateUrl: './loginsignup.component.html',
  styleUrls: ['./loginsignup.component.css']
})
export class LoginsignupComponent {

  constructor(private http:HttpClient,private router:Router){

  }
  isLoading=false;
response:any={}
logniResponse:any={}
 onLogin(requestBody:{Email:String,Password:String})
 {  
    let header = new HttpHeaders().set('IpAddress','127.0.0.1');
    this.http.post('http://localhost:8081/v1/user/login',requestBody,{headers:header})
    .subscribe(res =>{
      console.log(res)
      this.logniResponse=res
      if(this.logniResponse.Status===200){
        this.router.navigate(['/dashboard'],{queryParams:{Email:requestBody.Email, token:this.logniResponse.Data.Token}})
      }else{
        this.router.navigate(['/loginsignup'])
      }
    }) 
    
 }
  onOtpSend(requestBody:{Email:String}){
    this.isLoading=true;
   console.log(requestBody)
   const header = new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8'
      });

const requestOptions = { headers: header };
   this.http.post('http://localhost:8081/v1/user/send-otp',requestBody)
   .subscribe(res=>{
     console.log(res)
     this.response= res
     if(this.response.Status===200){
      this.isLoading=false;
      this.router.navigate(['/otp'],{queryParams:{Email:requestBody.Email}});
      }else{
        this.isLoading=false;
        this.router.navigate(['/loginsignup']);
      }
   })
  }
}
