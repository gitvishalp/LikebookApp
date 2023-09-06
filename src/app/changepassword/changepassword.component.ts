import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit{

  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute){

  }
  requestBody:any={}
  changeResponse:any={}
  isLoading=false;
  token= this.route.snapshot.queryParamMap.get("token");
  ngOnInit(): void {
      if(this.token==null){
        this.router.navigate(['/loginsignup'])
      }
  }

  onChange(formData:{newpass:String,confPass:String}){
     if(formData.newpass!=formData.confPass){
      this.changeResponse.Message='Confirm Password not Same!'
      return;
     }
    this.requestBody.NewPassword= formData.newpass
    const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
     console.log(this.requestBody)
     this.http.put('http://localhost:8081/v1/user/change-password',this.requestBody,{ headers: header})
     .subscribe(res=>{
       this.changeResponse=res
       if(this.changeResponse.Status===200){
        this.router.navigate(['/loginsignup'])
       }
     })
  }
}
