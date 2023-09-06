import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute){

  }
  forgetResponse:any={}
  requestBody:any={}
  isLoading = false;
  onforget(Email:any){
   this.isLoading = true;
   this.http.post(`http://localhost:8081/v1/user/forgot-password/${Email.Email}`,this.requestBody)
   .subscribe(res =>{
     this.forgetResponse=res
     if(this.forgetResponse.Status===200){
      this.isLoading = false;
      this.forgetResponse.Message='Code sent!!'
      this.router.navigate(['/loginwithcode'])
     }else{
      this.isLoading=false;
        this.router.navigate(['/forgetpassword'])
     }
   })
  }
}
