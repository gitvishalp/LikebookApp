import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loginwithcode',
  templateUrl: './loginwithcode.component.html',
  styleUrls: ['./loginwithcode.component.css']
})
export class LoginwithcodeComponent {
  logniResponse:any={}
 constructor(private http:HttpClient, private router:Router,private route:ActivatedRoute){
  
 }

 onLogin(requestBody:{Email:String,Code:String}){
  let header = new HttpHeaders().set('IpAddress','127.0.0.1');
  this.http.post('http://localhost:8081/v1/user/login-code',requestBody,{headers:header})
  .subscribe(res =>{
    console.log(res)
    this.logniResponse=res
    if(this.logniResponse.Status===200){
      this.router.navigate(['/changepassword'],{queryParams:{token:this.logniResponse.Data.Token}})
    }else{
      this.router.navigate(['/loginwithcode'])
    }
  })
 }
}
