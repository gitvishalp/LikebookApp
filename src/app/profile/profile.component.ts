import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLoading=false;
  users:any=[]
  visible:boolean = false;
  show:boolean = false;
  response:any={}
  deleteResponse:any={}
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute){

  }
  mail= this.route.snapshot.queryParamMap.get("Email");
  token = this.route.snapshot.queryParamMap.get("token");
ngOnInit(): void {
  if(this.token==null){
    this.router.navigate(['/loginsignup']);
  }
    this.isLoading=true;
    const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
      this.http.get('http://localhost:8081/v1/user/download-Pic',{headers:header})
      .subscribe(res=>{
        this.retrieveResonse=res
        if(this.retrieveResonse.Status!==200){
          this.retrievedImage=false
          return;
        }
        this.base64Data = this.retrieveResonse.Data;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      })
      this.http.get('http://localhost:8081/v1/user/user-details',{headers:header})
      .subscribe(res=>{
        this.response=res
        this.isLoading=false
        if(this.response.Data.EmailVerified==true){
          this.response.EmailStatus='Verified'
        }else{
          this.response.EmailStatus='Not Verified'
        }
      })
}
onVisible(){
  this.visible = !this.visible
}
onModal(){
  this.show = !this.show
}
changePassword(){
  this.router.navigate(['/changepassword'],{queryParams:{token:this.token}})
}
profilepic(){
  this.router.navigate(['/profilepic'],{queryParams:{Email:this.mail,token:this.token}})
}
deleteAccount(){
  const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
  this.http.delete(`http://localhost:8081/v1/user/${this.mail}`,{headers:header})
  .subscribe(res=>{
    this.deleteResponse=res
    if(this.deleteResponse.Status===200){
      this.router.navigate(['/loginsignup'])
    }
  })
}
removeProfile(){
  const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
  this.http.delete(`http://localhost:8081/v1/user/profile`,{headers:header})
  .subscribe(res=>{
    this.deleteResponse=res
    if(this.deleteResponse.Status===200){
      this.router.navigate(['/dashboard'],{queryParams:{Email:this.mail,token:this.token}}).then(()=>{
        window.location.reload();
      });
    }
  })
}
updateuser(){
    this.router.navigate(['/updateuser'],{queryParams:{Email:this.mail,token:this.token}})
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
