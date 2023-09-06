import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
notificationResponse:any=[]
deleteResponse:any={}
  constructor(private route:ActivatedRoute, private http:HttpClient, private router:Router){
  
  }
   mail= this.route.snapshot.queryParamMap.get("Email");
   token = this.route.snapshot.queryParamMap.get("token");
ngOnInit(): void {
  if(this.token==null){
    this.router.navigate(['/loginsignup'])
   }
   const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
   //Make a call to the Spring Boot Application to save the image
   this.http.get('http://localhost:8081/v1/user/notification', { headers:header})
   .subscribe((res:any)=>{
     this.notificationResponse=res.Data
     console.log(this.notificationResponse)
   })
}
remove(notificationId:String){
  const header = new HttpHeaders().set('Authorization',`Bearer ${this.token}`);
   //Make a call to the Spring Boot Application to save the image
   this.http.delete(`http://localhost:8081/v1/user/notification/${notificationId}`, { headers:header})
   .subscribe(res=>{
     this.deleteResponse=res
     console.log(this.deleteResponse)
   })
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
