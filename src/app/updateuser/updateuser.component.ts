import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {

constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute){

}
  isLoading=false;
  mail:any = this.route.snapshot.queryParamMap.get("Email");
  token = this.route.snapshot.queryParamMap.get("token");
  ngOnInit(): void {
      if(this.mail==null){
        this.router.navigate(['/loginsignup'])
      }
      if(this.token==null){
        this.router.navigate(['/loginsignup'])
      }
  }
response:any={}
  onUpdateUser(requestBody:{FirstName:String,LastName:String,PhoneNumber:String,DateOfBirth:Date,Password:String,Country:String,AccountType:String,Occupation:String}){
     this.isLoading=true;
     const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
  console.log(requestBody)
     this.http.put('http://localhost:8081/v1/user/update',requestBody,{headers:header})
     .subscribe((res=>{
      this.response=res
      if(this.response.Status===200){
        this.isLoading=false;
        this.router.navigate(['/dashboard'],{queryParams:{Email:this.mail,token:this.token}})
      }else{
        this.isLoading=false;
        this.router.navigate(['/updateuser'],{queryParams:{Email:this.mail}}).then(()=>{
          window.location.reload
        });
      }
      console.log(this.response)
     }))
  }
  friend(){
    this.router.navigate(['/suggest'],{queryParams:{Email:this.mail,token:this.token}})
  }
  profile(){
    this.router.navigate(['/profile'],{queryParams:{Email:this.mail,token:this.token}})
  }
  dashboard(){
    this.router.navigate(['/dashboard'],{queryParams:{Email:this.mail, token:this.token}})
    }
    notification(){
      this.router.navigate(['/notification'],{queryParams:{Email:this.mail, token:this.token}})
    }
}
