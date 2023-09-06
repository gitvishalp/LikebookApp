import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit{

  constructor(private http:HttpClient, private router:Router,private route:ActivatedRoute){

  }
  isLoading=false;
  mail:any = this.route.snapshot.queryParamMap.get("Email");
  ngOnInit(): void {
      if(this.mail==null){
        this.router.navigate(['/loginsignup'])
      }
  }
response:any={}
  onCreateUser(requestBody:{EmailAddress:String,FirstName:String,LastName:String,PhoneNumber:String,DateOfBirth:Date,Password:String,Country:String,AccountType:String,Occupation:String}){
    this.isLoading=true;
    requestBody.EmailAddress= this.mail
     const header = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
    });
  console.log(requestBody)
const requestOptions = { headers: header };
     this.http.post('http://localhost:8081/v1/user/create-user',requestBody)
     .subscribe((res=>{
      this.response=res
      if(this.response.Status===200){
        this.isLoading=false;
        this.router.navigate(['/loginsignup'])
      }else{
        this.isLoading=false;
        this.router.navigate(['/createuser'],{queryParams:{Email:this.mail}}).then(()=>{
          window.location.reload
        });
      }
      console.log(this.response)
     }))
  }
}
